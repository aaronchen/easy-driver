# Installation

## Install Homebrew

> (For Windows) Please skip this.

> (For Mac) Please make sure you have **Xcode Command Line Tools** installed first by running `xcode-select --install` in Terminal.

(For Mac) In Terminal, run:

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Install Node.js

> (For Windows) Please download [Nodes.js](https://nodejs.org/en/download/) and install.

(For Mac) In Terminal, run:

```shell
brew update
brew install node
```

## Get EasyDriver

> (For Windows) Please first download [Git for Windows](https://git-scm.com/download/win) and install.

In Terminal, run:

```shell
cd /path/to/all_projects_root

git clone https://github.com/aaronchen/easy-driver

cd easy-driver

npm install
```

\*\* If `npm install` fails to install `chromedriver`, you can try to use CDN like:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;`npm install --chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver`

## Run Sample Test Cases

In Terminal: Go to your **EasyDriver** directory, and run:

```shell
node testcase_sample
```

Or, you can create your own test case (mytest01.js), and run it like: `node mytest01`

## Update EasyDriver

In Terminal, run:

```shell
git pull
npm install
```

# EasyDriver Usage

## Supported Browsers

The preferred/default browser for **EasyDriver** is `chrome`. `firefox`, while supported, is not fully tested.

## Available Methods

##### easyd - Instance

- `new EasyDriver({locale='en', browser='chrome'})`

```javascript
const EasyDriver = require("./easy-driver");
const easyd = new EasyDriver({ locale: "ja", browser: "chrome" });
```

##### easyd - WebDriver Methods

- `easyd.actions() -> ActionSequence` => See **Class ActionSequence**
- `easyd.addCookie(name, value, minutes)`
- `easyd.activeElement() -> WebElementPromise`
- `easyd.alertAccept()`
- `easyd.alertDismiss()`
- `easyd.alertSendKeys(text)`
- `easyd.back()`
- `easyd.blank()`
- `easyd.close()`
- `easyd.deleteAllCookies()`
- `easyd.deleteCookie(name)`
- `easyd.findElement(locator, isVisible = false) -> WebElementPromise`

```javascript
easyd.findElement("id=btn1", true).then(function(element) {
  // code to handle element
});
```

- `easyd.findElements(locator) -> Thenable<Array<WebElement>>`

```javascript
easyd.findElements("//option").then(function(elements) {
  // code to handle elements
});
```

- `easyd.forward()`
- `easyd.getAllWindowHandles() -> Thenable<Array<string>>`
- `easyd.getCookie(name) -> Thenable<(Options.Cookie|null)>` See **[Options.Cookie](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_Options.Cookie.html)**
- `easyd.getCookies() -> Thenable<Array<Options.Cookie>>`
- `easyd.getTitle() -> Thenable<string>`
- `easyd.getWindowHandle() -> Thenable<string>`
- `easyd.Key` => See **Enumeration Key**
- `easyd.locateElementBy(locator) -> By`
- `easyd.log(msg)`
- `easyd.maximizeWindow()`
- `easyd.maximizeToScreenSize()`
- `easyd.open(url)`
- `easyd.openWindow(name)`
- `easyd.quit()`
- `easyd.refresh()`
- `easyd.request(url, settings) -> WebElementPromise` => See **HTTP Request Support**
- `easyd.runScript(script, callback) -> callback(retval)`
- `easyd.setPageLoadTimeout(ms)`
- `easyd.setScriptTimeout(ms)`
- `easyd.setTimeout(ms)`
- `easyd.setWindowPosition(x, y)`
- `easyd.setWindowSize(width, height)`
- `easyd.sleep(ms)`
- `easyd.switchToAlert() -> AlertPromise` => See **[AlertPromise](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_AlertPromise.html)**
- `easyd.switchToDefaultContent()`
- `easyd.switchToFirstWindow()`
- `easyd.switchToFrame(number_or_loc_or_web)`
- `easyd.switchToLastWindow()`
- `easyd.switchToWindow(nameOrHandle)`
- `easyd.takeScreenshot(png_filename)`
- `easyd.until` => See **until Conditions**
- `easyd.wait(fn, timeout)`
- `easyd.waitForAlertIsPresent() -> Thenable<Alert>`
- `easyd.waitForTitleContains(substr)`
- `easyd.waitForTitleIs(title)`
- `easyd.waitForTitleMatches(regex)`
- `easyd.waitForUrlContains(substrUrl)`
- `easyd.waitForUrlIs(url)`
- `easyd.waitForUrlMatches(regex)`
- `easyd.zoom(scale)`

##### easyd - WebElement Methods

\*\* **loc_or_web**: Parameter can be either **_locater_** or **_WebElement_**.

- `easyd.blur(loc_or_web)`
- `easyd.checkAll(loc_or_web)`
- `easyd.clear(loc_or_web)`
- `easyd.click(loc_or_web)`
- `easyd.clickAt(loc_or_web, offset = {x: 0, y: 0})`
- `easyd.doubleClick(loc_or_web, offset = {x: 0, y: 0})`
- `easyd.dragAndDrop(from_loc_or_web, to_loc_or_web_or_positions)`
- `easyd.focus(loc_or_web)`
- `easyd.getAttribute(loc_or_web, attributeName) -> Thenable<(string|null)>`
- `easyd.getRect(loc_or_web) -> Thenable<{x: number, y: number, height: number, width: number}>`
- `easyd.getTagName(loc_or_web) -> Thenable<string>`
- `easyd.getText(loc_or_web) -> Thenable<string>`
- `easyd.hasAttribute(loc_or_web, attributeName) -> Thenable<boolean>`
- `easyd.hide(loc_or_web)`
- `easyd.highlight(loc_or_web)`
- `easyd.isDisplayed(loc_or_web) -> Thenable<boolean>`
- `easyd.isEnabled(loc_or_web) -> Thenable<boolean>`
- `easyd.isSelected(loc_or_web) -> Thenable<boolean>`
- `easyd.mouseMove(loc_or_web, offset = {x: 0, y: 0})`
- `easyd.move(loc_or_web, to_loc_or_web_or_positions)`
- `easyd.removeAttribute(loc_or_web, attributeName)`
- `easyd.rightClick(loc_or_web)`
- `easyd.rightClickAt(loc_or_web, offset = {x: 0, y: 0})`
- `easyd.scrollIntoView(loc_or_web)`
- `easyd.select(select_loc_or_web, option_locator)`
- `easyd.sendKeys(loc_or_web, ...keys)`
  <!-- * `easyd.sendKeysForFile(input_file_locator, abs_file_path)` -->
- `easyd.setAttribute(loc_or_web, attribute, value)`
- `easyd.show(loc_or_web)`
- `easyd.submit(loc_or_web)`
- `easyd.trigger(loc_or_web, eventName)`
- `easyd.unCheckAll(loc_or_web)`
- `easyd.visible(loc_or_web, isVisible = true)`
- `easyd.waitForDisabled(loc_or_web)`
- `easyd.waitForEnabled(loc_or_web)`
- `easyd.waitForNotPresent(loc_or_web)`
- `easyd.waitForNotSelected(loc_or_web)`
- `easyd.waitForNotVisible(loc_or_web)`
- `easyd.waitForPresent(locator)`
- `easyd.waitForSelected(loc_or_web)`
- `easyd.waitForSwitchToFrame(number_or_loc_or_web)`
- `easyd.waitForTextContains(loc_or_web, substr)`
- `easyd.waitForTextIs(loc_or_web, text)`
- `easyd.waitForTextMatches(loc_or_web, regex)`
- `easyd.waitForVisible(loc_or_web)`

##### easyd - Custom methods

- `easyd.clearAllDrawings()`
- `easyd.createDirectories(dirtree)`
- `easyd.drawAlert()`
- `easyd.drawArrow(from_loc_or_web, to_loc_or_web)`
- `easyd.drawColorFill(loc_or_web, color = 'rgba(255,0,0,0.8)')`
- `easyd.drawConfirmation(dismiss = false)`
- `easyd.drawFlyover(loc_or_web, settings = {attribute: 'title', offsetX: 5, offsetY: 15, fromLastPos: false, drawSymbol: false})`
- `easyd.drawRedMark(loc_or_web, padding = {top: 0, left: 0, bottom: 0, right: 0})`
- `easyd.drawSelect(loc_or_web, offset = {x: 0, y: 0})`
- `easyd.drawText(loc_or_web, text, settings = {color: '#f00', fontSize: 13, marginTop: 2, right: 20})`
- `easyd.drawValidation(loc_or_web, offset = {x: 0, y: 0})`
- `easyd.drawX(loc_or_web)`
- `easyd.takeElementShot(loc_or_web, png_filename, offset = {x: 0, y: 0})`
- `easyd.takeScrollShot(loc_or_web, png_filename, offset = {x: 0, y: 0})`

## Supported **_locator_** Formats

> **_Format: 'type=type_syntax'_**

- `css=.btn`
- `class=btn-primary`
- `id=frame1`
- `name=j_username`
- `xpath=//span/a`

> If **_type_** (css, class, id, name, xpath) is not specified, locator starting with `//` or `(` will be parsed as **xpath**, while `.`, `[` and `#` are treated as **css**.

> **css** pseudo selector support => `:eq()`

## Enumeration Key

`easyd.Key`

> All supported keys: [here](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html)

## **_until_** Conditions

Almost all **_until_** conditions are integrated in `easyd.waitFor`. However, if you want to use **_until_** conditions on your own, you can use:

`easyd.until`

> All Supported Conditions: [until](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html)

## Class **ActionSequence**

`easyd.actions()`

```javascript
easyd.findElements('css=[id*="item"]').then(function(elements) {
  easyd
    .actions()
    .keyDown(easyd.Key.SHIFT)
    .click(elements[0])
    .click(elements[2])
    .keyUp(easyd.Key.SHIFT)
    .perform();
});
```

> All Actions: [Class ActionSequence](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ActionSequence.html)

## HTTP Request Support

**EasyDriver** supports HTTP Requst via [request-promise](https://github.com/request/request-promise).

`easyd.request(url, settings) -> WebElementPromise`

> `Accept-Language` of HTTP Request is default to **EasyDriver**'s `locale`.

```javascript
const EasyDriver = require('./easy-driver');
const easyd = new EasyDriver({locale: 'zh'});

easyd.request(
  'url',
  {
    method: 'GET', // HTTP Request Method.  Default: 'GET'
    headers: { 'User-Agent': 'EasyDriver' } // HTTP Request Headers
    qs: { field1: 'value1' }, // Parameters as "Query String"
    body: { key1: 'value1' }, // Parameters as "JSON" body
    formData: { key1: 'value1' },  // Parameters as "HTML Form Data"
    auth: {user: 'username', pass: 'password'} // Basic Auth
    encoding: 'utf8' // Data URL encoding.  Default: 'utf8'
    json: true // HTTP Response in JSON.  Default: true
  }
).then (function (element) {
  // Do stuff to the element that holds the result of HTTP Request
});
```

## WebDriver Instance

`easyd.wd`

> [Class WebDriver](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html)

## WebElement

> [Class WebElement](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html)

## selenium-webdriver

> [Documentation](https://seleniumhq.github.io/selenium/docs/api/javascript/index.html)

## Limitation

`chrome` can only take screenshot of viewport. It is currently not possible to take a full-page screenshot or elements that are not visible in the viewport.

## EasySuite

EasySuite is a preliminary Test Suite support for EasyDriver. It is based upon [selenium-webdriver/testing](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/testing/index.html) and [Mocha](https://mochajs.org).

To run sample test suite, please execute: `node_modules/.bin/mocha testsuite_sample.js`

Or, use the template below to write your own test suite. EasySuite Javascript file needs to be executed with `mocha`.

```javascript
const EasyDriver = require("./easy-driver");
const EasySuite = require("./easy-suite");

const locale = process.env.EASYD_LOCALE || "en";
const easyd = new EasyDriver({ locale: locale });
const suite = new EasySuite("EasyDriver Test Suite");

suite.before(function() {
  // Steps before any test cases are run
});

suite.after(function() {
  // Steps after all test cases are run
});

suite.testcase("010.010.010", function() {
  // Steps for test case 010.010.010
});

suite.testcase("010.010.020", function() {
  // Steps for test case 010.010.020
});

suite.testcase("010.020.010", function() {
  // Steps for test case 010.020.010
});

// Only run certain test cases
// suite.only(['010.010.010', "010.020.010"]);
// Or, only run test cases specified in JSON file
// suite.onlyJSON('testcases.json', locale);

suite.run();
```

## selenium-webdriver CHANGES

Current version: [3.4.0](https://github.com/SeleniumHQ/selenium/blob/master/javascript/node/selenium-webdriver/CHANGES.md)
