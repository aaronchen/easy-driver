const EasyDriver = require('./easy-driver');

const lang = 'zh-tw';

// New with locale: lang
const easyd = new EasyDriver({locale: lang, browser: 'chrome'});
// Create directory: lang
easyd.createDirectories(lang);
// Open Google
easyd.open('https://www.google.com');
// Maximize the window
easyd.maximizeWindow();
// Search 'webdriver'
easyd.sendKeys('name=q', 'webdriver' + easyd.Key.ENTER);
// Wait till search results are done
easyd.waitForVisible('id=rso');
// Red-mark 'Send Feedback'
easyd.drawRedMark('(//*[@class="_Gs"])[2]');
// Scroll to 'Send Feedback' at the bottom of the page
easyd.scrollIntoView('(//*[@class="_Gs"])[2]');
// Capture the page
easyd.takeScreenshot(`${lang}/sample`);
// Print Title
easyd.getTitle(function (title) {
  console.log('Title: ' + title);
});
// Clear redmark
easyd.clearAllDrawings();
// Sleep 6 seconds
easyd.sleep(6000);
// Quit
easyd.quit();
