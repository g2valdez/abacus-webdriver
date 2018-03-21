const fs = require('fs');
const readDir = require('./directory-reader');

const parseFeatureFile = function(filename) {
  let lastTags = [];
  const featureObject = {scenarios:[]};
  return new Promise((res, rej)=> {
    fs.readFile(filename, 'utf-8', (err, contents) => {
      const featureLines = contents.split('\n');
      let currentObject = featureObject;
      for (let i = 0; i < featureLines.length; i++) {
        let line = featureLines[i].trim();
        if (line[0] === '#') continue;
        if (/^@(.*)$/.test(line)) {
          lastTags = line.split(/\s+/);
        }
        else if (/^Feature(.*)$/.test(line)) {
          const featureInfo = line.match(/^Feature: (.*)$/);
          featureObject.title = featureInfo[1];
          featureObject.tags = lastTags;
          featureObject.steps = [];
          currentObject = featureObject;
          lastTags = [];
        }
        else if (/^Background:$/.test(line)) {
          currentObject = featureObject;
        }
        else if (/^Scenario(.*)$/.test(line)) {
          currentObject = {};
          featureObject.scenarios.push(currentObject);
          currentObject.feature = featureObject.title;
          const scenarioInfo = line.match(/^(.*):(.*)$/);
          currentObject.type = scenarioInfo[1].trim();
          currentObject.title = scenarioInfo[2].trim();
          currentObject.tags = lastTags.concat(featureObject.tags);
          currentObject.steps = featureObject.steps.slice(); // makes a copy of the featureobject steps array
          if (currentObject.type === 'Scenario Outline') currentObject.examples = [];

          lastTags = [];
        }
        else if (/^(Given|And|When|Then|But) (.*)$/.test(line)) {
          const stepInfo = line.match(/^(Given|And|When|Then|But) (.*)$/);
          currentObject.steps.push({keyword: stepInfo[1], step: stepInfo[2]});
        }
        else if (/^Examples:$/.test(line)) {
          if (currentObject.type !== "Scenario Outline") console.log("Scenarios don't have examples, yah dingus");
          i++;
          line = featureLines[i].trim();
          const keys = line.split("|").filter(function (el) {
            return el.length !== 0
          });
          keys.forEach((key, j) => {
            keys[j] = key.trim();
          });
          const newExample = {vals: [], tags: lastTags};
          currentObject.examples.push(newExample);
          lastTags = [];
          do {
            i++;
            line = featureLines[i].trim();
            while (line[0] === '#') {
              i++;
              line = featureLines[i].trim();
            }
            let values = line.split("|").filter(function (el) {
              return el.length !== 0
            });
            if (values.length === 0) break;
            const exampleValues = {};
            newExample.vals.push(exampleValues);
            values.forEach((value, j) => {
              exampleValues[keys[j]] = value.trim();
            });

          } while (/^\|(.*)\|$/.test(line) && i !== featureLines.length - 1);
        }
        else if (/^\|(.*)\|$/.test(line)) {
          const currentStep = currentObject.steps[currentObject.steps.length - 1];
          const dataTable = [];
          do {
            while (line[0] === '#') {
              i++;
              line = featureLines[i].trim();
            }
            if (!(/^\|(.*)\|$/.test(line)) || i >= featureLines.length) break;
            let values = line.split("|").filter(function (el) {
              return el.length !== 0
            });

            if (values.length === 0) break;

            values.forEach((value, j) => {
              values[j] = value.trim();
            });
            dataTable.push(values);
            i++;
            if(i >= featureLines.length) break;
            line = featureLines[i].trim();
          } while (/^\|(.*)\|$/.test(line) && i < featureLines.length);
          i--;
          currentStep.table = dataTable;
        }
      }
      res(featureObject);
    });
  });
};

module.exports = function(){
  return new Promise((res, rej)=>{
    const parsedFeatureArray = [];
    const files = readDir(process.env.CUCUMBER_FEATURE_DIRECTORY, /^(.*).feature$/);
    files.forEach((filename)=>{
      parseFeatureFile(filename).then((parsedFeature)=>{
        parsedFeatureArray.push(parsedFeature);
        if (parsedFeatureArray.length === files.length) res(parsedFeatureArray);
      });
    });
  });
};

