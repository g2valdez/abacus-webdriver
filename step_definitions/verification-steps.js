module.exports = ({ Then }) => {

  Then(/^user is taken to the "([^"]*)" page$/, (pageURI, next) => {
    global.pageID = pageURI;
    driver.wait(until.urlMatches(pageMap[global.pageID].URL), 5000, "User is never redirected")
      .catch((err)=>{
        return err;
      })
      .then((result) => {
        if (result !== true)
          next(result);
        else
          next();
    });
  });

  // Then(/^the "([^"]*)" element value contains "([^"]*)"$/, (buttonText, text, next) => {
  //   const buttonID = buttonText.replace(/ /g, '_').toUpperCase();
  //
  //   browser.wait(pageMap[global.pageID][buttonID].isPresent()).then(() => {
  //     expect(pageMap[global.pageID][buttonID].getAttribute('value')).to.eventually.contain(text).and.notify(next);
  //   });
  // });

  Then(/^the "([^"]*)" element text contains "([^"]*)"$/, (labelText, text, next) => {
    const labelID = labelText.replace(/ /g, '_').toUpperCase();

    let expectedString = text;
    // if (text.match(/(?:\*)/)) expectedString = localStorage.getItem(text.match(/\*([^*]*)\*/)[1]).toUpperCase();
    // TODO: use driver.wait(until.elementTextContains())
    expect(pageMap[global.pageID][labelID].getText()).to.eventually.contain(expectedString).and.notify(next);
  });

  Then(/^the "([^"]*)" element text is "([^"]*)"$/, (labelText, text, next) => {
    const labelID = labelText.replace(/ /g, '_').toUpperCase();

    let expectedString = text;
    // if (text.match(/(?:\*)/)) expectedString = localStorage.getItem(text.match(/\*([^*]*)\*/)[1]).toUpperCase();

    // TODO: use driver.wait(until.elementTextDisplays())
    expect(pageMap[global.pageID][labelID].getText()).to.eventually.equal(expectedString).and.notify(next);
  });

  // Then(/^the "([^"]*)" element value does not contain "([^"]*)"$/, (buttonText, text, next) => {
  //   const buttonID = buttonText.replace(/ /g, '_').toUpperCase();
  //   browser.wait(pageMap[global.pageID][buttonID].isPresent()).then(() => {
  //     expect(pageMap[global.pageID][buttonID].getAttribute('value')).to.eventually.not.contain(text).and.notify(next);
  //   });
  // });
  //
  // Then(/^the "([^"]*)" element text does not contain "([^"]*)"$/, (labelText, text, next) => {
  //   const labelID = labelText.replace(/ /g, '_').toUpperCase();
  //
  //   let expectedString = text;
  //   if (text.match(/(?:\*)/)) expectedString = localStorage.getItem(text.match(/\*([^*]*)\*/)[1]).toUpperCase();
  //
  //   browser.wait(pageMap[global.pageID][labelID].isPresent()).then(() => {
  //     expect(pageMap[global.pageID][labelID].getText()).to.eventually.not.contain(expectedString)
  //       .and.notify(next);
  //   });
  //
  // });
  //
  // Then(/^"([^"]*)" element is greater than or equal to "([^"]*)" element$/, (ele1, ele2, next) => {
  //   const el1 = ele1.replace(/ /g, '_').toUpperCase();
  //   const el2 = ele2.replace(/ /g, '_').toUpperCase();
  //   const promise = pageMap[global.pageID].stringToNumber(pageMap[global.pageID][el1].getText());
  //   pageMap[global.pageID].stringToNumber(pageMap[global.pageID][el2].getText())
  //     .then((promiseText) => {
  //       expect(promise).to.eventually.be.at.least(promiseText).and.notify(next);
  //     });
  //
  // });
  //
  // Then(/^the "([^"]*)" drop down displays "([^"]*)"$/, (el, text, next) => {
  //   const labelID = el.replace(/ /g, '_').toUpperCase();
  //
  //   let expectedString = text;
  //   if (text.match(/(?:\*)/)) expectedString = localStorage.getItem(text.match(/\*([^*]*)\*/)[1]);
  //   const select = pageMap[global.pageID][labelID];
  //   browser.wait(select.isPresent()).then(() => {
  //     select.getAttribute('value').then((i) => {
  //       expect(select.element(by.css(`option[value="${i}"]`)).getText()).to.eventually.equal(expectedString)
  //         .and.notify(next);
  //     });
  //   });
  //
  // });
  //
  // Then(/^the "([^"]*)" drop down only contains the following options:$/, (el, table, next) => {
  //   const dropDownID = el.replace(/ /g, '_').toUpperCase();
  //   const select = pageMap[global.pageID][dropDownID];
  //
  //
  //   const optionsPromise = new Promise((res, rej) => {
  //     select.all(by.css('option')).then((selections) => {
  //       const optionsArray = [];
  //       const numSelections = selections.length;
  //       selections.forEach((selection, i) => {
  //         selection.getText().then((option) => {
  //           optionsArray.push(option);
  //           if (i === numSelections - 1) res(optionsArray);
  //         });
  //       });
  //     });
  //   });
  //
  //   optionsPromise.then((options) => {
  //     const numRows = table.raw().length;
  //
  //     table.raw().forEach((row, i) => {
  //       let expectedString = row[0];
  //       if (expectedString.match(/(?:\*)/)) expectedString = localStorage.getItem(expectedString.match(/\*([^*]*)\*/)[1]);
  //       if (expectedString !== '') {
  //         const ind = options.indexOf(expectedString);
  //         expect(ind).to.not.equal(-1);
  //         options.splice(ind, 1);
  //       }
  //       if (i === numRows - 1) {
  //         expect(options.length).to.equal(1);
  //         next();
  //       }
  //     });
  //   });
  //
  // });
  //
  // Then(/^the "([^"]*)" drop down is non-empty$/, (el, next) => {
  //   const dropDownID = el.replace(/ /g, '_').toUpperCase();
  //   const select = pageMap[global.pageID][dropDownID];
  //
  //   const optionsPromise = new Promise((res, rej) => {
  //     select.all(by.css('option')).then((selections) => {
  //       const numSelections = selections.length;
  //       res(numSelections > 1);
  //     });
  //   });
  //
  //   expect(optionsPromise).to.eventually.be.ok.and.notify(next);
  // });
  //
  // Then(/^the "([^"]*)" text field is non-empty$/, (buttonText, next) => {
  //   const buttonID = buttonText.replace(/ /g, '_').toUpperCase();
  //   browser.wait(pageMap[global.pageID][buttonID].isPresent()).then(() => {
  //     expect(pageMap[global.pageID][buttonID].getAttribute('value')).to.eventually.not.equal('').and.notify(next);
  //   });
  // });
  //
  // Then(/^the page (displays|does not display) "([^"]*)"$/, (torf, text, next) => {
  //   const testEl = element(by.xpath(`//*[text()="${text}"]`));
  //   testEl.isPresent().then((pres) => {
  //     if (pres) {
  //       expect(testEl.isDisplayed()).to.eventually.equal(torf === 'displays').and.notify(next);
  //     } else {
  //       expect(testEl.isPresent()).to.eventually.equal(torf === 'displays').and.notify(next);
  //     }
  //   });
  // });

  Then(/^the "([^"]*)" element is present$/, (elementText, next) => {
    const elementID = elementText.replace(/ /g, '_').toUpperCase();
    // TODO: What if element isn't present??
    const isPresentPromise = new Promise((resolve, reject)=>{
      driver.wait(until.elementLocated(pageMap[global.pageID][elementID].locator), 3000)
        .then(resolve);
    });

    expect(isPresentPromise).to.eventually.be.ok.and.notify(next);
  });

  // Then(/^the "([^"]*)" element is not present$/, (elementText, next) => {
  //   const elementID = elementText.replace(/ /g, '_').toUpperCase();
  //
  //   browser.wait(() => {
  //     return pageMap[global.pageID][elementID].isPresent().then((isPres) => {
  //       return !isPres;
  //     });
  //   }).then(() => {
  //     expect(pageMap[global.pageID][elementID].isPresent())
  //               .to.eventually.equal(false).and.notify(next);
  //   });
  // });
  //
  // const validateImages = function (webTitle) {
  //   return new Promise((fulfill, reject) => {
  //     resemble('imgs/reference/' + webTitle + '.png')
  //               .compareTo('imgs/test/' + webTitle + '.png')
  //               .onComplete((data) => {
  //                 global.diff_urls.urls.push(data.getImageDataUrl());
  //                 if (data.misMatchPercentage > 0.0) {
  //                   fulfill(false);
  //                   return false;
  //                 }
  //
  //                 fulfill(true);
  //                 return true;
  //
  //               });
  //   });
  // };
  //
  // Given(/^"([^"]*)" element is visually validated$/, (el, next) => {
  //   const elementID = el.replace(/ /g, '_').toUpperCase();
  //
  //   basePage.elementScreenshot(pageMap[global.pageID][elementID], elementID).then(() => {
  //     expect(validateImages(elementID)).to.eventually.be.ok.and.notify(next);
  //   });
  // });
  //
  // Given(/^([^"]*) page is validated$/, (el, next) => {
  //   const elementID = el.replace(/ /g, '_').toUpperCase();
  //
  //   basePage.pageScreenshot(pageMap[global.pageID][elementID], elementID).then(() => {
  //     expect(validateImages(elementID)).to.eventually.be.ok.and.notify(next);
  //   });
  // });
  //
  // Then(/^there are ([0-9]) open browser tabs$/, (numTabs, next) => {
  //   browser.driver.getAllWindowHandles().then((handles) => {
  //     expect(handles.length).to.equal(parseInt(numTabs, 10));
  //     next();
  //   });
  // });
};