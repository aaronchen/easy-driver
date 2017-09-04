'use strict';

require('chromedriver');
// require('geckodriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs-extra');
const rp = require('request-promise');

class EasyDriver {
  /**
   * @param {{browser: string, locale: string}} [options={browser: 'chrome', locale: 'en'}] Driver Options.
   `browser` is either 'chrome' (default) or 'firefox'.  `locale` is 'en' by default.
  */
  constructor(options = {locale: 'en', browser: 'chrome'}) {
    // WebDriver
    this.Button = webdriver.Button;
    this.By = webdriver.By;
    this.error = webdriver.error;
    this.Key = webdriver.Key;
    this.promise = webdriver.promise;
    this.until = webdriver.until;

    // Default Timeout
    this.TIMEOUT = 30000;
    // Verbose on
    this.VERBOSE = true;

    // options
    if (process.env.SELENIUM_BROWSER) options.browser = process.env.SELENIUM_BROWSER;
    this.browser = (options.browser && options.browser.match(/firefox/i)) ? 'firefox' : 'chrome';
    this.locale = options.locale || 'en';
    this.locale = (this.browser === 'firefox') ? regionToLowerCase(this.locale) : regionToUpperCase(this.locale);

    // Chrome Options
    // Languages: https://support.google.com/googleplay/android-developer/table/4419860?hl=en
    // pref_names.cc: https://goo.gl/NXSyLn
    const chromeOptions = new chrome.Options();
    chromeOptions.setUserPreferences({ 'intl.accept_languages': this.locale });
    // get rid of "Chrome is being controlled by automated test software"
    // chromeOptions.excludeSwitches("enable-automation");
    chromeOptions.addArguments(["disable-infobars", "disable-notifications"]);
    // chromeOptions.addArguments(`lang=${this.locale}`);
    // chromeOptions.addExtensions(`extensions/Advanced-Font-Settings_v0.67.crx`);
    // chromeOptions.addExtensions('extensions/Chrome-extension-source-viewer_v1.5.crx');
    // chromeOptions.addExtensions('extensions/Full-Page-Screen-Capture_v2.2.crx');

    // Firefox Options
    const profile = new firefox.Profile();
    profile.setPreference('marionette', false);
    profile.setPreference('intl.accept_languages', this.locale);
    profile.setAcceptUntrustedCerts(true);
    profile.setAssumeUntrustedCertIssuer(true);
    // profile.addExtension('extensions/selenium_ide-2.9.1-fx.xpi');
    const firefoxOptions = new firefox.Options()
                               .useGeckoDriver(false)
                               .setProfile(profile);

    // Driver Instance
    this.wd = new webdriver.Builder()
                  .forBrowser(this.browser)
                  .setChromeOptions(chromeOptions)
                  .setFirefoxOptions(firefoxOptions)
                  .build();

    // AsyncScript/PageLoad/ImplictWait Timeouts
    this.wd.manage().timeouts().setScriptTimeout(this.TIMEOUT);
    this.wd.manage().timeouts().pageLoadTimeout(this.TIMEOUT);
    this.wd.manage().timeouts().implicitlyWait(this.TIMEOUT);
  }

  /*--- ***************** ---*/
  /*--- WebDriver Methods ---*/
  /*--- ***************** ---*/

  /**
   * Create a new action sequence
   * @return {ActionSequence} A new action sequence.
   */
  actions() {
    this.log(`  [-] actions()`);
    return this.wd.actions();
  }

  /**
   * Add a cookie
   * @param {string} name Name of the cookie
   * @param {string} value Value of the cookie
   * @param {number} minutes Minutes after the cookie expires
   * @return {Thenable<undefined>}
   */
  addCookie(name, value, minutes) {
    this.log(`  [-] addCookie()`);
    return this.wd.manage().addCookie({
      name: name,
      value: value,
      expiry: new Date(Date.now() + (minutes * 60 * 1000))
    });
  }

  /**
   * Retrieve the document.activeElement element
   * @return {WebElementPromise}
   */
  activeElement() {
    this.log(`  [-] activeElement()`);
    return this.wd.switchTo().activeElement();
  }

  /**
   * Accept an alert/confirm/prompt dialog
   * @return {Thenable<undefined>}
   */
  alertAccept() {
    this.log(`  [-] alertAccept()`);

    const self = this;
    return self.waitForAlertIsPresent().then(function () {
      return self.switchToAlert().then(function (alert) {
        return alert.accept();
      });
    });
  }

  /**
   * Dismiss a confirm/prompt dialog
   * @return {Thenable<undefined>}
   */
  alertDismiss() {
    this.log(`  [-] alertDismiss()`);

    const self = this;
    return self.waitForAlertIsPresent().then(function () {
      return self.switchToAlert().then(function (alert) {
        return alert.dismiss();
      });
    });
  }

  /**
   * Send Keys to window.prompt() and accept the dialog
   * @param {string} text Text to send into prompt dialog
   * @return {Thenable<undefined>}
   */
  alertSendKeys(text) {
    this.log(`  [-] alertSendKeyss()`);

    const self = this;
    return self.waitForAlertIsPresent().then(function () {
      return self.switchToAlert().then(function (alert) {
        alert.sendKeys(text);
        return alert.accept();
      });
    });
  }

  /**
   * Move backwards in the browser history
   * @return {Thenable<undefined>}
   */
  back() {
    this.log(`  [-] back()`);
    return this.wd.navigate().back();
  }

  /**
   * Open a blank page
   * @return {Thenable<undefined>}
   */
  blank() {
    this.log(`  [-] blank()`);
    return this.wd.get('about:blank');
  }

  /**
   * Close the current window
   * @return {Thenable<undefined>}
   */
  close() {
    this.log(`  [-] close()`);
    return this.wd.close();
  }

  /**
   * Delete all cookies visible to the current page
   * @return {Thenable<undefined>}
   */
  deleteAllCookies() {
    this.log(`  [-] deleteAllCookies()`);
    return this.wd.manage().deleteAllCookies();
  }

  /**
   * Delete a cookie
   * @param {string} name Name of the cookie
   * @return {Thenable<undefined>}
   */
  deleteCookie(name) {
    this.log(`  [-] deleteCookie()`);
    return this.wd.manage().deleteCookie(name);
  }

  /**
   * Find Element
   * @param {string} locator Element locator
   * @param {bool} [isVisible=false] Wait until WebElement is visible
   * @return {WebElementPromise} A WebElement that can be used to issue commands against the located element.
   */
  findElement(locator, isVisible = false) {
    const self = this;
    const defer = self.promise.defer();

    if (locator instanceof webdriver.WebElement) {
      self.log(`      Locating: WebElement`);
      if (isVisible) self.wait(self.until.elementIsVisible(locator));
      defer.fulfill(locator);
    }
    else {
      self.log(`      Locating: ${locator}`);
      // Add ':eq()' support to css selector
      const re = /:eq\((\d+)\)/;
      const found = locator.match(re);

      if(!found) {
        const byLocator = self.locateElementBy(locator);

        self.wait(self.until.elementsLocated(byLocator));

        self.wd.findElement(byLocator)
        .then(function (element) {
          if (isVisible) self.wait(self.until.elementIsVisible(element));
          defer.fulfill(element);
        })
        .catch(function (reason) {
          defer.reject(reason);
        });
      }
      else {
        const query = locator.substring(0, found.index);
        const nth = found[1];

        self.findElements(query)
        .then(function (elements) {
          self.log(`      Locating: ${query} => ${nth}`);
          if (nth > elements.length) {
            defer.reject(new self.error.NoSuchElementError(`Maximum index for ${locator} is ${elements.length}.`));
          }
          else {
            const element = elements[nth];
            if (isVisible) self.wait(self.until.elementIsVisible(element));
            defer.fulfill(element);
          }
        })
        .catch(function (reason) {
          defer.reject(reason);
        });
      }
    }

    return new webdriver.WebElementPromise(self.wd, defer.promise);
  }

  /**
   * Find Elements
   * @param {string} locator Element locator
   * @return {Thenable<Array<WebElement>>} A promise that will resolve to an array of WebElements.
   */
  findElements(locator) {
    this.log(`      Locating: ${locator}`);

    const byLocator = this.locateElementBy(locator);

    this.wait(this.until.elementsLocated(byLocator));

    return this.wd.findElements(byLocator);
  }

  /**
   * Move forwards in the browser history
   * @return {Thenable<undefined>}
   */
  forward() {
    this.log(`  [-] forward()`);
    return this.wd.navigate().forward();
  }

  /**
   * Get All Window Handles
   * @return {Thenable<Array<string>>} A promise that will be resolved with an array of window handles.
   */
  getAllWindowHandles() {
    this.log(`  [-] getAllWindowHandles()`);
    return this.wd.getAllWindowHandles();
  }

  /**
   * Get a cookie
   * @param {string} name Name of the cookie
   * @return {Thenable<(Options.Cookie|null)>}
   */
  getCookie(name) {
    this.log(`  [-] getCookie()`);
    return this.wd.manage().getCookie(name);
  }

  /**
   * Get all cookies
   * @return {Thenable<Array<Options.Cookie>>}
   */
  getCookies() {
    this.log(`  [-] getCookies()`);
    return this.wd.manage().getCookies();
  }

  /**
   * Get title
   * @return {Thenable<string>} A promise that will be resolved with the current page's title.
   */
  getTitle() {
    this.log(`  [-] getTitle()`);
    return this.wd.getTitle();
  }

  /**
   * Get Window Handle
   * @return {Thenable<string>} A promise that will be resolved with the current window's handle.
   */
  getWindowHandle() {
    this.log(`  [-] getWindowHandle()`);
    return this.wd.getWindowHandle();
  }

  /**
   * Locate element 'By' strategies
   * @param {string} locator Element locator with: strategy=search_string
   * @return {By} A new By locator.
   */
  locateElementBy(locator) {
    locator = parseLocator(locator);

    if (locator.type === 'css') { return this.By.css(locator.string); }
    if (locator.type === 'xpath') { return this.By.xpath(locator.string); }
    if (locator.type === 'class') { return this.By.className(locator.string); }
    if (locator.type === 'id') { return this.By.id(locator.string); }
    if (locator.type === 'name') { return this.By.name(locator.string); }
    if (locator.type === 'implicit') {
      if (locator.string.startsWith('//') || locator.string.startsWith('(')) {
        return this.By.xpath(locator.string);
      }
      if (locator.string.startsWith('.') || locator.string.startsWith('#') || locator.string.startsWith('[')) {
        return this.By.css(locator.string);
      }
      console.error(`Can not locate an element with '${locator.string}'.`);
    } else {
      console.error(`Can not locate an element by type '${locator.type}'.`);
    }

    console.log(`Supported locator types are: css=, xpath=, class=, id=, name=.`);

    throw new this.error.InvalidSelectorError();
  }

  /**
   * Log messages
   * @param {string} msg Messages to log
   */
  log(msg) {
    if (this.VERBOSE) {
      const defer = this.promise.defer();
      defer.fulfill(msg);
      defer.promise.then(function (message) {
        console.log(message);
      });
    }
  }

  /**
   * Maximize the window
   * @return {Thenable<undefined>}
   */
  maximizeWindow() {
    this.log(`  [-] maximizeWindow()`);
    return this.wd.manage().window().maximize();
  }

  /**
   * Maximize the window to the screen size
   * @return {Thenable<undefined>}
   */
  maximizeToScreenSize() {
    this.log(`  [-] maximizeToScreenSize()`);

    const self = this;
    return self.wd.executeScript(`
      return {width: window.screen.width, height: window.screen.height};
    `).then (function (size) {
      self.wd.manage().window().setPosition(0, 0);
      return self.wd.manage().window().setSize(size.width, size.height);
    });
  }

  /**
   * Open URL
   * @param {string} url A fully qualified URL to open
   * @return {Thenable<undefined>}
   */
  open(url) {
    this.log(`  [-] open(${url})`);
    return this.wd.get(url);
  }

  /**
   * Open a new blank window
   * @param {string} name Name of the new window
   * @return {Thenable<undefined>}
   */
  openWindow(name) {
    this.log(`  [-] openWindow(${name})`);

    return this.wd.executeScript(`
      var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      window.open("about:blank", arguments[0], "width=" + w + ",height=" + h);
    `, name);
  }

  /**
   * Terminates the browser session
   * @return {Thenable<undefined>}
   */
  quit() {
    this.log(`  [-] quit()`);
    return this.wd.quit();
  }

  /**
   * Refresh the page
   * @return {Thenable<undefined>}
   */
  refresh() {
    this.log(`  [-] refresh()`);
    return this.wd.navigate().refresh();
  }

  /**
   * HTTP Request
   * @param {string} url URL
   * @param {{method: string, qs: object, body: object, formData: object, auth: object, encoding: string, json: boolean}}
            [settings = { method: 'GET', headers: null, qs: null, body: null, formData: null, auth: { user: null, pass: null}, encoding: 'utf8', json: true}]
            method: HTTP Request method,
            headers: HTTP Request headers,
            qs: Query String,
            body: Request body as JSON,
            formData: Request body as HTML form,
            auth: Basic Auth,
            encoding: Response (Data URL) encoding
            json: Response in JSON
   * @return {WebElementPromise} A WebElement that holds the result of HTTP request
   */
  request(url, settings = { method: 'GET', headers: null, qs: null, body: null, formData: null, auth: { user: null, pass: null}, encoding: 'utf8', json: true}) {
    const self = this;
    const defer = self.promise.defer();

    const encoding = settings.encoding || 'utf8';
    const headers = settings.headers || {};
    const options = {
      uri: url,
      method: settings.method || 'GET',
      headers: Object.assign({ 'Accept-Language': self.locale }, headers),
      strictSSL: false,
      json: settings.json || true
    };
    if (settings.auth.user && settings.auth.pass) options.auth = settings.auth;
    if (settings.qs) options.qs = settings.qs;
    if (settings.body) options.body = settings.body;
    if (settings.formData) options.formData = settings.formData;

    rp(options)
      .then(function (body) {
        self.open(`data:text/plain;charset=${encoding},${body}`);
      })
      .catch(function (err) {
        self.open(`data:text/plain;charset=${encoding},${err.error.message}`);
      })
      .finally(function () {
        self.findElement('//body/pre')
          .then(function (element) {
            defer.fulfill(element);
          })
          .catch(function (reason) {
            defer.reject(reason);
          });
      });

    return new webdriver.WebElementPromise(self.wd, defer.promise);
  }

  /**
   * Run script
   * @param {(string|Function)} script The script to execute
   * @param {Function} fn A callback function aftrer the script is executed
   */
  runScript(script, fn) {
    this.log(`  [-] runScript()`);

    this.wd.executeScript(script)
    .then(function (retval) {
      // * For a HTML element, the value will resolve to a WebElement
      // * Null and undefined return values will resolve to null
      // * Booleans, numbers, and strings will resolve as is
      // * Functions will resolve to their string representation
      // * For arrays and objects, each member item will be converted according to the rules above
      fn(retval);
    })
    .catch(function (err) {
      fn(err);
    });
  }

  /**
   * Sets the amount of time to wait for a page load
   * @param {number} ms The amount of time to wait, in milliseconds.  If negative, page loads may be indefinite.
   * @return {Thenable<undefined>}
   */
  setPageLoadTimeout(ms) {
    this.log(`  [-] setPageLoadTimeout(${ms})`);
    return this.wd.manage().timeouts().pageLoadTimeout(ms);
  }

  /**
   * Set the timeout for asynchronous scripts
   * @param {number} ms Timeout in milliseconds
   * @return {Thenable<undefined>}
   */
  setScriptTimeout(ms) {
    this.log(`  [-] setScriptTimeout(${ms})`);
    return this.wd.manage().timeouts().setScriptTimeout(ms);
  }

  /**
   * Set the timeout for 'Wait'
   * @param {number} ms Timeout in milliseconds
   */
  setTimeout(ms) {
    this.log(`  [-] setTimeout(${ms})`);
    this.TIMEOUT = parseInt(ms) || this.TIMEOUT;
    this.wd.manage().timeouts().implicitlyWait(this.TIMEOUT);
  }

  /**
   * Set window's position
   * @param {number} x The desired horizontal position, relative to the left side of the screen
   * @param {number} y The desired vertical position, relative to the top of the of the screen
   * @return {Thenable<undefined>}
   */
  setWindowPosition(x, y) {
    this.log(`  [-] setWindowPosition(${x}, ${y})`);
    return this.wd.manage().window().setPosition(x, y);
  }

  /**
   * Set window's size
   * @param {number} width The desired window width
   * @param {number} height The desired window height
   * @return {Thenable<undefined>}
   */
  setWindowSize(width, height) {
    this.log(`  [-] setWindowSize(${width}, ${height})`);
    return this.wd.manage().window().setSize(width, height);
  }

  /**
   * Sleep
   * @param {number} ms The amount of time, in milliseconds, to sleep
   * @return {Thenable<undefined>}
   */
  sleep(ms) {
    ms = parseInt(ms) || 0;
    return this.wd.sleep(ms);
  }

  /**
   * Switch to window.alert(), window.confirm(), or window.prompt()
   * @return {AlertPromise}
   */
  switchToAlert() {
    this.log(`  [-] switchToAlert()`);
    return this.wd.switchTo().alert();
  }

  /**
   * Switch to the default content
   * @return {Thenable<undefined>}
   */
  switchToDefaultContent() {
    this.log(`  [-] switchToDefaultContent()`);
    return this.wd.switchTo().defaultContent();
  }

  /**
   * Switch to first window
   * @return {Thenable<undefined>}
   */
  switchToFirstWindow() {
    this.log(`  [-] switchToFirstWindow()`);

    const self = this;

    return self.wd.getAllWindowHandles().then(function (handles) {
      return self.wd.switchTo().window(handles[0]);
    });
  }

  /**
   * Switch to frame
   * @param {(number|string|WebElement)} locator The frame locator
   * @return {Thenable<undefined>}
   */
  switchToFrame(locator) {
    this.log(`  [-] switchToFrame()`);

    const element = (isNaN(locator)) ? this.findElement(locator) : locator;
    return this.wd.switchTo().frame(element);
  }

  /**
   * Switch to last-opened window
   * @return {Thenable<undefined>}
   */
  switchToLastWindow() {
    this.log(`  [-] switchToLastWindow()`);

    const self = this;

    return self.wd.getAllWindowHandles().then(function (handles) {
      return self.wd.switchTo().window(handles[handles.length-1]);
    });
  }

  /**
   * Switch to window
   * @param {string} nameOrHandle The name or window handle of the window to switch focus to
   * @return {Thenable<undefined>}
   */
  switchToWindow(nameOrHandle) {
    this.log(`  [-] switchToWindow(${nameOrHandle})`);
    return this.wd.switchTo().window(nameOrHandle);
  }

  /**
   * Take a screenshot
   * @param {string} filename File name (.png) of the screenshot
   */
  takeScreenshot(filename) {
    this.log(`  [-] takeScreenshot(${filename})`);

    if (!filename.endsWith('.png')) filename += '.png';

    this.sleep(500);

    this.wd.takeScreenshot().then(function (data) {
      fs.writeFile(filename, data, 'base64', function (err) {
        if(err) console.error(err);
      });
    });
  }

  /**
   * Wait
   * @param {Function} condition A function to evaluate as a condition
   * @param {number} [timeout] Wait timeout
   * @return {Thenable}
   */
  wait(condition, timeout) {
    timeout = parseInt(timeout) || this.TIMEOUT;
    return this.wd.wait(condition, timeout);
  }

  /**
   * Wait till an alert is presented
   * @return {Thenable<Alert>}
   */
  waitForAlertIsPresent() {
    this.log(`  [-] waitForAlertIsPresent()`);
    return this.wait(this.until.alertIsPresent());
  }

  /**
   * Wait till Title contains substr
   * @param {string} substr The substring that should be present in the page title
   * @return {Thenable}
   */
  waitForTitleContains(substr) {
    this.log(`  [-] waitForTitleContains()`);
    return this.wait(this.until.titleContains(substr));
  }

  /**
   * Wait till Title is title
   * @param {string} title The expected page title
   * @return {Thenable}
   */
  waitForTitleIs(title) {
    this.log(`  [-] waitForTitleIs()`);
    return this.wait(this.until.titleIs(title));
  }

  /**
   * Wait till Title matches regex
   * @param {RegExp} regex The regular expression to test against
   * @return {Thenable}
   */
  waitForTitleMatches(regex) {
    this.log(`  [-] waitForTitleMatches()`);
    return this.wait(this.until.titleMatches(regex));
  }

  /**
   * Wait till URL contains substrUrl
   * @param {string} substrUrl The substring that should be present in the current URL
   * @return {Thenable}
   */
  waitForUrlContains(substrUrl) {
    this.log(`  [-] waitForUrlContains()`);
    return this.wait(this.until.urlContains(substrUrl));
  }

  /**
   * Wait till URL is url
   * @param {string} url The expected page url
   * @return {Thenable}
   */
  waitForUrlIs(url) {
    this.log(`  [-] waitForUrlIs()`);
    return this.wait(this.until.urlIs(url));
  }

  /**
   * Wait till URL matches regex
   * @param {RegExp} regex The regular expression to test against
   * @return {Thenable}
   */
  waitForUrlMatches(regex) {
    this.log(`  [-] waitForUrlMatches()`);
    return this.wait(this.until.urlMatches(regex));
  }

  /**
   * Zoom in/out of a window
   * @param {number} scale Scale of zoom
   * @return {Thenable<(T|null)>}
   */
  zoom(scale) {
    this.log(`  [-] zoom(${scale})`);
    scale = Number(scale);
    return this.wd.executeScript(`
      document.body.style.webkitTransform = 'scale(${scale})';
      document.body.style.transform = 'scale(${scale})';
    `);
  }

  /*--- ****************** ---*/
  /*--- WebElement Methods ---*/
  /*--- ****************** ---*/

  /**
   * Remove focus from an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<(T|null)>}
   */
  blur(locator) {
    this.log(`  [-] blur()`);

    const element = this.findElement(locator);
    return this.wd.executeScript(`
      var element = arguments[0];
      element.blur();
    `, element);
  }

  /**
   * Check all checkboxes under an element
   * @param {(string|WebElement)} locator Element locator
   */
  checkAll(locator) {
    this.log(`  [-] checkAll()`);

    const element = this.findElement(locator);

    element.findElements(this.locateElementBy('css=input[type="checkbox"]'))
    .then(function (checkboxes) {
      checkboxes.forEach(function (checkbox) {
        checkbox.isSelected().then(function (isChecked) {
          if (!isChecked) checkbox.click();
        });
      });
    });
  }

  /**
   * Clear the value of an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<undefined>}
   */
  clear(locator) {
    this.log(`  [-] clear()`);
    return this.findElement(locator).clear();
  }

  /**
   * Click an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<undefined>}
   */
  click(locator) {
    this.log(`  [-] click()`);

    return this.findElement(locator, true).click();
  }

  /**
   * Click an element with an offset
   * @param {(string|WebElement)} locator Element locator
   * @param {{x: number, y: number}} [offset={x: 0, y: 0}] An offset within the element
   * @return {Thenable}
   */
  clickAt(locator, offset = {x: 0, y: 0}) {
    this.log(`  [-] clickAt()`);

    const self = this;
    return self.findElement(locator, true).then(function (element) {
      return self.actions().mouseMove(element, offset).click().perform();
    });
  }

  /**
   * Double-click an element
   * @param {(string|WebElement)} locator Element locator
   * @param {{x: number, y: number}} [offset={x: 0, y: 0}] An offset within the element
   * @return {Thenable}
   */
  doubleClick(locator, offset = {x: 0, y: 0}) {
    this.log(`  [-] doubleClick()`);
    return this.actions()
      .mouseMove(this.findElement(locator, true), offset)
      .doubleClick()
      .perform();
  }

  /**
   * Drag and drop
   * @param {(string|WebElement)} from_locator Element locator
   * @param {(string|WebElement|{x: number, y: number})} to_locator The location to drag to,
            either as another locator or an offset in pixels.
   * @return {Thenable}
   */
  dragAndDrop(from_locator, to_locator) {
    this.log(`  [-] dragAndDrop()`);

    const from = this.findElement(from_locator, true);
    const to = (typeof to_locator === 'object' && 'x' in to_locator) ? to_locator : this.findElement(to_locator);
    return this.actions().mouseMove(from).dragAndDrop(from, to).perform();
  }

  /**
   * Give focus to an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<(T|null)>}
   */
  focus(locator) {
    this.log(`  [-] focus()`);

    const element = this.findElement(locator);
    return this.wd.executeScript(`
      var element = arguments[0];
      element.focus();
    `, element);
  }

  /**
   * Get attribute value of an element
   * @param {(string|WebElement)} locator Element locator
   * @param {string} attributeName The name of the attribute to query
   * @return {Thenable<(string|null)>}
   */
  getAttribute(locator, attributeName) {
    this.log(`  [-] getAttribute()`);
    return this.findElement(locator).getAttribute(attributeName);
  }

  /**
   * Get Position and Size of an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<{x: number, y: number, width: number, height: number}>}
   */
  getRect(locator) {
    this.log(`  [-] getRect()`);

    const element = this.findElement(locator);

    // return new Promise(function (resolve, reject) {
    //   element.getLocation().then(function (position) {
    //     element.getSize().then(function (size) {
    //       resolve({x: position.x, y: position.y, width: size.width, height: size.height});
    //     });
    //   });
    // });

    return this.promise.consume(function* () {
      return yield element.getLocation().then(function (position) {
        return element.getSize().then(function (size) {
          return ({x: position.x, y: position.y, width: size.width, height: size.height});
        });
      });
    });
  }

  /**
   * Get Get tag name of an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<string>}
   */
  getTagName(locator) {
    this.log(`  [-] getTagName()`);
    return this.findElement(locator).getTagName();
  }

  /**
   * Get Get the visible innerText of an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<string>}
   */
  getText(locator) {
    this.log(`  [-] getText()`);
    return this.findElement(locator).getText();
  }

  /**
   * Check if an element has the specified attribute
   * @param {(string|WebElement)} locator Element locator
   * @param {string} attributeName The name of the attribute to check
   * @return {Thenable<boolean>}
   */
  hasAttribute(locator, attributeName) {
    this.log(`  [-] hasAttribute()`);

    const element = this.findElement(locator, true);

    return this.wd.executeScript(`
      return arguments[0].hasAttribute(arguments[1]);
    `, element, attributeName).then(function (reseult) {
      return reseult;
    });
  }

  /**
   * Hide an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<(T|null)>}
   */
  hide(locator) {
    this.log(`  [-] hide()`);

    const element = this.findElement(locator);
    return this.wd.executeScript(`
      arguments[0].style.display = 'none';
    `, element);
  }

  /**
   * Highlight an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<(T|null)>}
   */
  highlight(locator) {
    this.log(`  [-] highlight()`);

    const element = this.findElement(locator);
    return this.wd.executeScript(`
      arguments[0].style.backgroundColor = '#FFFF33';
    `, element);
  }

  // TODO: Need to think how to implement isEnabled/isDisplayed/isSelected
  /**
   * If an element is displayed
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<boolean>}
   */
  isDisplayed(locator) {
    this.log(`  [-] isDisplayed()`);
    return this.findElement(locator).isDisplayed();
  }

  // TODO: Need to think how to implement isEnabled/isDisplayed/isSelected
  /**
   * If an element is enabled
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<boolean>}
   */
  isEnabled(locator) {
    this.log(`  [-] isEnabled()`);
    return this.findElement(locator).isEnabled();
  }

  // TODO: Need to think how to implement isEnabled/isDisplayed/isSelected
  /**
   * If an element is selected
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<boolean>}
   */
  isSelected(locator) {
    this.log(`  [-] isSelected()`);
    return this.findElement(locator).isSelected();
  }

  /**
   * Move to an element by offset
   * @param {(string|WebElement)} locator Element locator
   * @param {{x: number, y: number}} [offset={x: 0, y: 0}] An offset within the element.
   * @return {Thenable}
   */
  mouseMove(locator, offset = {x: 0, y: 0}) {
    this.log(`  [-] mouseMove()`);
    return this.actions().mouseMove(this.findElement(locator, true), offset).perform();
  }

  /**
   * Move an element
   * @param {(string|WebElement)} from_locator Element locator
   * @param {(string|WebElement|{x: number, y: number})} to_locator The location to move to,
            either as another locator,  WebElement, or an offset in {x,y}.
   * @return {Thenable}
   */
  move(from_locator, to_locator) {
    this.log(`  [-] move()`);

    const from = this.findElement(from_locator, true);
    const to = (typeof to_locator === 'object' && 'x' in to_locator) ? to_locator : this.findElement(to_locator);

    return this.wd.executeScript(`
      var from = arguments[0];
      var to = arguments[1];

      var left = window.scrollX, top = window.scrollY;

      if ('x' in to) {
        var rect = from.getBoundingClientRect();
        left += rect.left + to.x;
        top += rect.top + to.y;
      } else {
        var rect = to.getBoundingClientRect();
        left += rect.left;
        top += rect.top;
      }

    	from.style.left = left + 'px';
    	from.style.top = top + 'px';

    `, from, to);
  }

  /**
   * Remove an attribute from an element
   * @param {(string|WebElement)} locator Element locator
   * @param {string} attributeName The name of the attribute to remove
   * @return {Thenable<(T|null)>}
   */
  removeAttribute(locator, attributeName) {
    this.log(`  [-] removeAttribute()`);

    const element = this.findElement(locator, true);

    return this.wd.executeScript(`
      var element = arguments[0];
      var attributeName = arguments[1];
      if (element.hasAttribute(attributeName)) {
        element.removeAttribute(attributeName);
      }
    `, element, attributeName);
  }

  /**
   * Right-click on an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  rightClick(locator) {
    this.log(`  [-] rightClick()`);
    return this.actions()
               .click(this.findElement(locator, true), this.Button.RIGHT)
               .perform();
  }

  /**
   * Right-click on an element by offset
   * @param {(string|WebElement)} locator Element locator
   * @param {{x: number, y: number}} [offset={x: 0, y: 0}] An offset within the element.
   * @return {Thenable}
   */
  rightClickAt(locator, offset = {x: 0, y: 0}) {
    this.log(`  [-] rightClickAt()`);
    return this.actions()
               .mouseMove(this.findElement(locator, true), offset)
               .click(this.Button.RIGHT)
               .perform();
  }

  /**
   * Scroll an element into view
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<(T|null)>}
   */
  scrollIntoView(locator) {
    this.log(`  [-] scrollIntoView()`);
    return this.wd.executeScript(`arguments[0].scrollIntoView(true);`, this.findElement(locator));
  }

  /**
   * Select an option in a drop-down menu
   * @param {(string|WebElement)} select_locator SELECT element locator
   * @param {string} option_locator OPTION element locator
   * @return {Thenable<undefined>}
   */
  select(select_locator, option_locator) {
    this.log(`  [-] select()`);

    const select = this.findElement(select_locator, true);

    return select.findElement(this.locateElementBy(option_locator)).then(function (option) {
      return option.click();
    });
  }

  /**
   * Send keys to an element
   * @param {(string|WebElement)} locator Element locator
   * @param {...(string|Key|Array<(string|Key)>)} keys Keys to send
   * @return {Thenable<undefined>}
   */
  sendKeys(locator, ...keys) {
    this.log(`  [-] sendKeys()`);
    return this.findElement(locator).sendKeys(...keys);
  }

  // /**
  //  * Send keys to Input Type "File"
  //  * @param {(string|WebElement)} input_file_locator locator for <input type="file">
  //  * @param {string} abs_file_path Absolute file path
  //  * @return {Thenable<undefined>}
  //  */
  // sendKeysForFile(input_file_locator, abs_file_path) {
  //   this.log(`  [-] fileUpload(${input_file_locator}, ${abs_file_path})`);
  //
  //   const self = this;
  //   const element = self.findElement(input_file_locator, true);
  //
  //   self.getAttribute(element, 'type').then(function (val) {
  //     if (val.toLowerCase() != 'file') {
  //       console.error(`Element ${input_file_locator} is not type="file".`);
  //       throw new this.error.NoSuchElementError();
  //     }
  //   });
  //
  //   self.sleep(1000);
  //
  //   return self.wd.executeScript(`
  //     var el = arguments[0];
  //     el.onclick = function(event) {
  //       event.preventDefault();
  //     };
  //   `, element).then(function () {
  //     self.click(element);
  //     return self.sendKeys(element, abs_file_path);
  //   });
  // }

  /**
   * Set attribute value for an element
   * @param {(string|WebElement)} select_locator SELECT element locator
   * @param {string} attribute attribute name
   * @param {string} value attribute value
   */
  setAttribute(locator, attribute, value) {
    this.log(`  [-] setAttribute()`);

    const element = this.findElement(locator);

    this.wd.executeScript(`
      var element = arguments[0];
      var attribute = arguments[1];
      var value = arguments[2];

      element.setAttribute(attribute, value);
    `, element, attribute, value);
  }

  /**
   * Show an element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<(T|null)>}
   */
  show(locator) {
    this.log(`  [-] show()`);

    const element = this.findElement(locator);
    return this.wd.executeScript(`
      arguments[0].style.display = '';
    `, element);
  }

  /**
   * Submit the form containing the element
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable<undefined>}
   */
  submit(locator) {
    this.log(`  [-] submit()`);
    return this.findElement(locator).submit();
  }

  /**
   * Trigger an event on an element
   * @param {(string|WebElement)} locator Element locator
   * @param {string} eventName Event Name
   * @return {Thenable<(T|null)>}
   */
  trigger(locator, eventName) {
    this.log(`  [-] trigger()`);

    const element = this.findElement(locator, true);

    return this.wd.executeScript(`
      var element = arguments[0];
      var eventName = arguments[1];

      var event = new Event(eventName, {"bubbles": false, "cancelable": false});
      element.dispatchEvent(event);
    `, element, eventName);
  }

  /**
   * Uncheck all checkboxes under an element
   * @param {(string|WebElement)} locator Element locator
   */
  unCheckAll(locator) {
    this.log(`  [-] unCheckAll()`);

    const element = this.findElement(locator);

    element.findElements(this.locateElementBy('css=input[type="checkbox"]'))
    .then(function (checkboxes) {
      checkboxes.forEach(function (checkbox) {
        checkbox.isSelected().then(function (isChecked) {
          if (isChecked) checkbox.click();
        });
      });
    });
  }

  /**
   * Set visibility of an element
   * @param {(string|WebElement)} locator Element locator
   * @param {bool} [isVisible=true] visibility of the element
   * @return {Thenable<(T|null)>}
   */
  visible(locator, isVisible = true) {
    this.log(`  [-] visible()`);

    const element = this.findElement(locator);
    return this.wd.executeScript(`
      arguments[0].style.visibility = arguments[1];
    `, element, isVisible ? 'visible' : 'hidden');
  }

  /**
   * Wait till an element is disabled
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForDisabled(locator) {
    this.log(`  [-] waitForDisabled()`);
    return this.wait(this.until.elementIsDisabled(this.findElement(locator)));
  }

  /**
   * Wait till an element is enabled
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForEnabled(locator) {
    this.log(`  [-] waitForEnabled()`);
    return this.wait(this.until.elementIsEnabled(this.findElement(locator)));
  }

  /**
   * Wait till an element is not presented
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForNotPresent(locator) {
    this.log(`  [-] waitForNotPresent()`);
    return this.wait(this.until.stalenessOf(this.findElement(locator)));
  }

  /**
   * Wait till an element is not selected
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForNotSelected(locator) {
    this.log(`  [-] waitForNotSelected()`);
    return this.wait(this.until.elementIsNotSelected(this.findElement(locator)));
  }

  /**
   * Wait till an element is not visible
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForNotVisible(locator) {
    this.log(`  [-] waitForNotVisible()`);
    return this.wait(this.until.elementIsNotVisible(this.findElement(locator)));
  }

  /**
   * Wait till an element is present
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForPresent(locator) {
    this.log(`  [-] waitForPresent()`);
    return this.wait(this.until.elementsLocated(this.locateElementBy(locator)));
  }

  /**
   * Wait till an element is selected
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForSelected(locator) {
    this.log(`  [-] waitForSelected()`);
    return this.wait(this.until.elementIsSelected(this.findElement(locator)));
  }

  /**
   * Wait till switching to a frame
   * @param {(number|string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForSwitchToFrame(locator) {
    this.log(`  [-] waitForSwitchToFrame()`);
    const frame = (isNaN(locator)) ? this.findElement(locator) : locator;
    return this.wait(this.until.ableToSwitchToFrame(frame));
  }

  /**
   * Wait till an element's text contains substring
   * @param {(string|WebElement)} locator Element locator
   * @param {string} substr The substring to search for
   * @return {Thenable}
   */
  waitForTextContains(locator, substr) {
    this.log(`  [-] waitForTextContains()`);
    return this.wait(this.until.elementTextContains(this.findElement(locator), substr));
  }

  /**
   * Wait till an element's innerText is text
   * @param {(string|WebElement)} locator Element locator
   * @param {string} text The expected text
   * @return {Thenable}
   */
  waitForTextIs(locator, text) {
    this.log(`  [-] waitForTextIs()`);
    return this.wait(this.until.elementTextIs(this.findElement(locator), text));
  }

  /**
   * Wait till an element's innerText matches regex
   * @param {(string|WebElement)} locator Element locator
   * @param {RegExp} regex The regular expression to test against
   * @return {Thenable}
   */
  waitForTextMatches(locator, regex) {
    this.log(`  [-] waitForTextMatches()`);
    return this.wait(this.until.elementTextMatches(this.findElement(locator), regex));
  }

  /**
   * Wait till an element is visible
   * @param {(string|WebElement)} locator Element locator
   * @return {Thenable}
   */
  waitForVisible(locator) {
    this.log(`  [-] waitForVisible()`);
    return this.wait(this.until.elementIsVisible(this.findElement(locator)));
  }

  /*--- ************** ---*/
  /*--- Custom Methods ---*/
  /*--- ************** ---*/

  /**
   * Clear all elements created by EasyDriver
   * @return {Thenable<(T|null)>}
   */
  clearAllDrawings() {
    this.log(`  [-] clearAllDrawings()`);

    return this.wd.executeScript(`
      var elements = window.document.body.querySelectorAll('[id*="easydriver_"]');
      for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
      window.easydriverTPSymbol = 9311;
      window.easydriverTPLastPos = {x: 0, y: 0};
    `);
  }

  /**
   * Create directories
   * @param {string} dirtree Directories to create
   */
  createDirectories(dirtree) {
    this.log(`  [-] createDirectories(${dirtree})`);

    const defer = this.promise.defer();
    defer.fulfill(dirtree);
    defer.promise.then(function (dirtree) {
      if (! fs.existsSync(dirtree)){ fs.mkdirsSync(dirtree); }
    });
  }

  /**
   * Draw Alert
   * @return {WebElementPromise}
   */
  drawAlert() {
    this.log(`  [-] drawAlert()`);
    return this.drawConfirmation(false, true);
  }

  /**
   * Draw an arrow between 2 element
   * @param {(string|WebElement)} from_locator Element locator
   * @param {(string|WebElement)} to_locator Element locator
   * @return {WebElementPromise}
   */
  drawArrow(from_locator, to_locator) {
    this.log(`  [-] drawArrow()`);

    const self = this;
    const from = self.findElement(from_locator, true);
    const to = self.findElement(to_locator, true);
    const cId = getId();

    self.wd.executeScript(`
      var element1 = arguments[0];
      var element2 = arguments[1];

      var rect1 = element1.getBoundingClientRect();
      var rect2 = element2.getBoundingClientRect();

      var from = {y: rect1.top};
      var to = {y: rect2.top};

      if (rect1.left > rect2.left) { from.x = rect1.left; to.x = rect2.right; }
      else if (rect1.left < rect2.left) { from.x = rect1.right; to.x = rect2.left; }
      else { from.x = rect1.left; to.x = rect2.left; }

      // create canvas
      var canvas = document.createElement('canvas');
      canvas.id = "${cId}";
      canvas.style.left = "0px";
      canvas.style.top = "0px";
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.zIndex = '100000';
      canvas.style.position = "absolute";
      document.body.appendChild(canvas);

      var headlen = 10;
      var angle = Math.atan2(to.y - from.y, to.x - from.x);
      var ctx = canvas.getContext("2d");

      // line
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.lineWidth  = 3;
      ctx.strokeStyle = '#ff0000';
      ctx.stroke();

      // arrow
      ctx.beginPath();
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(to.x - headlen * Math.cos(angle - Math.PI/7), to.y - headlen * Math.sin(angle - Math.PI/7));
      ctx.lineTo(to.x - headlen * Math.cos(angle + Math.PI/7), to.y - headlen * Math.sin(angle + Math.PI/7));
      ctx.lineTo(to.x, to.y);
      ctx.lineTo(to.x - headlen * Math.cos(angle - Math.PI/7), to.y - headlen * Math.sin(angle - Math.PI/7));
      ctx.lineWidth  = 3;
      ctx.strokeStyle = '#ff0000';
      ctx.stroke();

      return;
    `, from, to)
    .then(function () {
      return self.findElement(`[id="${cId}"]`);
    });
  }

  /**
   * Fill an element with color
   * @param {(string|WebElement)} locator Element locator
   * @param {string} [color='rgba(255,0,0,0.8)'] Color to fill
   * @return {WebElementPromise}
   */
  drawColorFill(locator, color = 'rgba(255,0,0,0.8)') {
    this.log(`  [-] drawColorFill()`);

    const self = this;
    const element = self.findElement(locator, true);
    const id = getId();

    return element.getLocation().then(function (location) {
      return element.getSize().then(function (size) {
        return self.wd.executeScript(`
          var colorfill = window.document.createElement('div');
          colorfill.id = '${id}';
          colorfill.style.backgroundColor = '${color}';
          colorfill.style.border = 'none';
          colorfill.style.display = 'block';
          colorfill.style.height = ${size.height} + 'px';
          colorfill.style.left = ${location.x} + 'px';
          colorfill.style.margin = '0px';
          colorfill.style.padding = '0px';
          colorfill.style.position = 'absolute';
          colorfill.style.top = ${location.y} + 'px';
          colorfill.style.width = ${size.width} + 'px';
          colorfill.style.zIndex = '99999';

          window.document.body.appendChild(colorfill);

          return;
        `)
        .then(function () {
          return self.findElement(`[id="${id}"]`);
        });
      });
    });
  }

  /**
   * Draw Confirmation
   * @param {bool} [dismiss=false] Dismiss confirmation (false means Accept)
   * @return {WebElementPromise}
   */
  drawConfirmation(dismiss = false, isAlert = false) {
    this.log(`  [-] drawConfirmation()`);

    const self = this;
    const cId = getId();
    const cancelButton = (isAlert) ? '' : `<button style='width: 70px; box-shadow: 1px 1px 1px #ccc;' onclick='document.getElementById(\\"${cId}\\").remove();'>Cancel</button>`;
    const okButton = `<button style='width: 70px; box-shadow: 1px 1px 1px #ccc;' onclick='document.getElementById(\\"${cId}\\").remove();'>OK</button>`;

    return self.waitForAlertIsPresent().then(function () {
      return self.switchToAlert().then(function (alert) {
        return alert.getText().then(function(text) {
          if (dismiss) {
            alert.dismiss();
          } else {
            alert.accept();
          }

          self.switchToDefaultContent();

          return self.wd.executeScript(`
            var alertBackground = document.createElement('div');
            alertBackground.id = "${cId}";
            alertBackground.style.backgroundColor = 'rgba(0,0,0,0.2)';
            alertBackground.style.color = "#000";
            alertBackground.style.display = 'block';
            alertBackground.style.height = "100%";
            alertBackground.style.position = 'fixed';
            alertBackground.style.right = '0px';
            alertBackground.style.top = '0px';
            alertBackground.style.width = "100%";
            alertBackground.style.zIndex = '99999';

            var alertDialog = document.createElement('div');
            alertDialog.id = "${cId}_dialog";
            alertDialog.style.backgroundColor = '#fff';
            alertDialog.style.border = 'solid 1px #000';
            alertDialog.style.font = "12px Verdana, sans-serif";
            alertDialog.style.margin = "20% auto";
            alertDialog.style.maxWidth = "800px";
            alertDialog.style.width = "50%";

            var alertTextDiv = document.createElement('div');
            alertTextDiv.id = "${cId}_text";
            alertTextDiv.innerText = "${text}";
            alertTextDiv.style.padding = "15px";

            var alertButtonDiv = document.createElement('div');
            alertButtonDiv.id = "${cId}_buttons";
            alertButtonDiv.innerHTML = "${cancelButton}${okButton}";
            alertButtonDiv.style.backgroundColor = '#eee';
            alertButtonDiv.style.margin = "0";
            alertButtonDiv.style.padding = "10px";
            alertButtonDiv.style.textAlign = "right";

            alertDialog.appendChild(alertTextDiv);
            alertDialog.appendChild(alertButtonDiv);
            alertBackground.appendChild(alertDialog);

            document.body.appendChild(alertBackground);

            return;
          `).then(function () {
            return self.findElement(`[id="${cId}"]`);
          });
        });
      });
    });
  }

  /**
   * Draw flyover for an element
   * @param {(string|WebElement)} locator Element locator
   * @param {{attribute: string, offsetX: number, offsetY: number, fromLastPos: boolean, drawSymbol: boolean}}
            [settings={attribute: 'title', offsetX: 5, offsetY: 15, fromLastPos: false, drawSymbol: false}]
            attribute: draw flyover on element's attribute,
            offsetX: offset X from the element,
            offsetY: offset Y from the element,
            fromLastPos: draw from last Flyover position,
            drawSymbol: draw symbol on the flyover.
   * @return {WebElementPromise}
   */
  drawFlyover(locator, settings = {attribute: 'title', offsetX: 5, offsetY: 15, fromLastPos: false, drawSymbol: false}) {
    this.log(`  [-] drawFlyover()`);

    const self = this;
    const element = self.findElement(locator, true);
    const attribute = settings.attribute || 'title';
    const offsetX = settings.offsetX || 5;
    const offsetY = settings.offsetY || 15;
    const fromLastPos = settings.fromLastPos || false;
    const drawSymbol = settings.drawSymbol || false;
    const sId = getId();
    const tpId = getId();

    self.waitForVisible(element);

    return self.wd.executeScript(`
      var element = arguments[0];
      var offsetX = arguments[1];
      var offsetY = arguments[2];
      var fromLastPos = arguments[3];
      var drawSymbol = arguments[4];

      if (! window.easydriverTPSymbol) window.easydriverTPSymbol = 9311;
      if (! window.easydriverTPLastPos) window.easydriverTPLastPos = {x: 0, y: 0};

      var rect = element.getBoundingClientRect();

      var title = element.getAttribute("${attribute}") || 'N/A';

      var left = window.scrollX + rect.left;
      var top = window.scrollY + rect.top;

      if (drawSymbol) {
        window.easydriverTPSymbol++;
        var symbol = document.createElement('div');
        symbol.id = "${sId}";
        symbol.textContent = String.fromCharCode(easydriverTPSymbol);
        symbol.style.color = '#f00';
        symbol.style.display = 'block';
        symbol.style.fontSize = '12px';
        symbol.style.left = (left - 12) + 'px';
        symbol.style.position = 'absolute';
        symbol.style.top = top + 'px';
        symbol.style.zIndex = '99999';
        document.body.appendChild(symbol);
      }

      var tooltip = document.createElement('div');
      tooltip.id = "${tpId}";
      tooltip.textContent = (drawSymbol) ? String.fromCharCode(easydriverTPSymbol) + " " + title : title;
      tooltip.style.position = 'absolute';
      tooltip.style.color = '#000';
      tooltip.style.backgroundColor = '#F5FCDE';
      tooltip.style.border = '3px solid #f00';
      tooltip.style.fontSize = '12px';
      tooltip.style.zIndex = '99999';
      tooltip.style.display = 'block';
      tooltip.style.height = '16px';
      tooltip.style.padding = '2px';
      tooltip.style.verticalAlign = 'middle';
      tooltip.style.top = ((fromLastPos) ? window.easydriverTPLastPos.y : (top + offsetY)) + 'px';
      tooltip.style.left = ((fromLastPos) ? window.easydriverTPLastPos.x : (left + offsetX)) + 'px';
      document.body.appendChild(tooltip);
      if (tooltip.scrollHeight > tooltip.offsetHeight) {
      	tooltip.style.height = (tooltip.scrollHeight + 3) + 'px';
      }

      var lastPos = tooltip.getBoundingClientRect();
      window.easydriverTPLastPos = {x: window.scrollX + lastPos.left, y: window.scrollY + lastPos.bottom};

      return;
    `, element, offsetX, offsetY, fromLastPos, drawSymbol)
    .then(function () {
      return self.findElement(`[id="${tpId}"]`);
    });
  }

  /**
   * Draw red-mark around an element
   * @param {(string|WebElement)} locator Element locator
   * @param {{top: number, left: number, bottom: number, right: number}} [padding={top: 0, left: 0, bottom: 0, right: 0}] Remark padding
   * @return {WebElementPromise}
   */
  drawRedMark(locator, padding = {top: 0, left: 0, bottom: 0, right: 0}) {
    this.log(`  [-] drawRedMark()`);

    const self = this;
    const element = self.findElement(locator, true);
    const id = getId();

    return element.getLocation().then(function (location) {
      return element.getSize().then(function (size) {
        return self.wd.executeScript(`
          var redmark = window.document.createElement('div');
          redmark.id = '${id}';
          redmark.style.border = '3px solid red';
          redmark.style.display = 'block';
          redmark.style.height = (${size.height} + 8 + ${padding.bottom}) + 'px';
          redmark.style.left = (${location.x} - 4 - ${padding.left}) + 'px';
          redmark.style.margin = '0px';
          redmark.style.padding = '0px';
          redmark.style.position = 'absolute';
          redmark.style.top = (${location.y} - 4 - ${padding.top}) + 'px';
          redmark.style.width = (${size.width} + 8 + ${padding.right}) + 'px';
          redmark.style.zIndex = '99999';

          window.document.body.appendChild(redmark);

          return;
        `)
        .then(function () {
          return self.findElement(`[id="${id}"]`);
        });
      });
    });
  }

  /**
   * Draw drop-down menu for SELECT element
   * @param {(string|WebElement)} locator Element locator
   * @param {{x: number, y: number}} [offset={x: 5, y: 15}] Menu offset from the element
   * @return {WebElementPromise}
   */
  drawSelect(locator, offset = {x: 0, y: 0}) {
    this.log(`  [-] drawSelect()`);

    const self = this;
    const element = self.findElement(locator, true);
    const sId = getId();

    self.getTagName(element).then(function (tagname) {
      if (tagname !== 'select') console.error('Element is not a select element: ${tagname}.');
    });

    return self.wd.executeScript(`
      var element = arguments[0];
      var offsetX = arguments[1];
      var offsetY = arguments[2];

      var rect = element.getBoundingClientRect();
      var x = rect.left;
      var y = rect.bottom;
      var width = element.offsetWidth;

      function escape(str) {
      	return str.replace(/[\\x26\\x0A<>'"]/g, function(r){ return "&#" + r.charCodeAt(0) + ";"; });
      }

      var content = "";
      for (var i = 0; i < element.length; i++) {
      	if (!element.options[i].disabled) content += escape(element.options[i].text) + "<br/>";
      }

      var dropdown = document.createElement('div');
      dropdown.id = "${sId}";
      dropdown.innerHTML = content;
      dropdown.style.backgroundColor = '#fff';
      dropdown.style.border = '1px solid #000';
      dropdown.style.color = '#000';
      dropdown.style.display = 'block';
      dropdown.style.fontSize = '12px';
      dropdown.style.height = '1px';
      dropdown.style.padding = '2px';
      dropdown.style.position = 'absolute';
      dropdown.style.width = width + 'px';
      dropdown.style.zIndex = '99999';

      document.body.appendChild(dropdown);
      dropdown.style.height = (dropdown.scrollHeight + 8) + 'px';
      if (dropdown.scrollWidth > width) {
      	dropdown.style.width = (dropdown.scrollWidth + 8) + 'px';
      }
      dropdown.style.left = (x + offsetX) + "px";
      dropdown.style.top = (y + offsetY) + "px";

      return;
    `, element, offset.x, offset.y)
    .then(function () {
      return self.findElement(`[id="${sId}"]`);
    });
  }

  /**
   * Draw Text after the element
   * @param {(string|WebElement)} locator Element locator
   * @param {string} text Text to draw
   * @param {{color: string, fontSize: number, marginTop: 2, right: number}} [settings={color: '#f00', fontSize: 13, marginTop: 2, right: 20}] Settings
   * @return {WebElementPromise}
   */
  drawText(locator, text, settings = {color: '#f00', fontSize: 13, marginTop: 2, right: 20}) {
    this.log(`  [-] drawText()`);

    const self = this;
    const element = self.findElement(locator, true);
    const color = settings.color || '#f00';
    const fontSize = settings.fontSize || 15;
    const marginTop = settings.marginTop || 2;
    const right = settings.right || 20;
    const id = getId();

    return element.getLocation().then(function (location) {
      return element.getSize().then(function (size) {
        return self.wd.executeScript(`
          var redtext = window.document.createElement('div');
          redtext.id = '${id}';
          redtext.innerText = '${text}';
          redtext.style.border = 'none';
          redtext.style.color = '${color}';
          redtext.style.display = 'block';
          redtext.style.font = '${fontSize}px Verdana, sans-serif';
          redtext.style.left = ${location.x} + 'px';
          redtext.style.margin = '0';
          redtext.style.padding = '0';
          redtext.style.position = 'absolute';
          redtext.style.right = ${right} + 'px';
          redtext.style.top = (${location.y} + ${size.height} + ${marginTop}) + 'px';
          redtext.style.zIndex = '99999';

          window.document.body.appendChild(redtext);

          return;
        `)
        .then(function () {
          return self.findElement(`[id="${id}"]`);
        });
      });
    });
  }

  /**
   * Draw validationMessage of an form element as a flyover
   * @param {(string|WebElement)} locator Element locator
   * @param {{x: number, y: number}} [offset={x: 0, y: 0}] Flyover offset from the element
   * @return {WebElementPromise}
   */
  drawValidation(locator, offset = {x: 0, y: 0}) {
    this.log(`  [-] drawValidation()`);

    const self = this;
    const element = self.findElement(locator, true);
    const vId = getId();

    return self.wd.executeScript(`
      var element = arguments[0];
      var offsetX = arguments[1];
      var offsetY = arguments[2];

      var message = (element.validity.customError) ? element.validationMessage : 'NO_CUSTOM_VALIDATION_MESSAGE';
      var rect = element.getBoundingClientRect();

      var validation = document.createElement('div');
      validation.id = "${vId}";
      validation.textContent = message;
      validation.style.position = 'absolute';
      validation.style.color = '#000';
      validation.style.backgroundColor = '#fff';
      validation.style.boxShadow = '-3px 3px 10px #ccc';
      validation.style.borderRadius = '5px';
      validation.style.border = '1px solid #ff0000';
      validation.style.fontSize = '12px';
      validation.style.zIndex = '99999';
      validation.style.display = 'block';
      validation.style.padding = '15px';
      validation.style.verticalAlign = 'middle';
      validation.style.top = (rect.top + 26 + offsetY) + 'px';
      validation.style.left = (rect.left - 26 + offsetX) + 'px';
      document.body.appendChild(validation);
      validation.insertAdjacentHTML(
        'afterbegin', '<div style="position: absolute; left: 15px; bottom: 45px; border-width: 0px 9px 9px 9px; border-style: solid; border-color: #ff0000 transparent; display: block; width: 0;"></div> <div style="position: absolute; left: 15px; bottom: 44px; border-width: 0px 9px 9px 9px; border-style: solid; border-color: #fff transparent; display: block; width: 0;"></div>'
      );

      return;
    `, element, offset.x, offset.y)
    .then(function () {
      return self.findElement(`[id="${vId}"]`);
    });
  }

  /**
   * Cross out an element
   * @param {(string|WebElement)} locator Element locator
   * @return {WebElementPromise}
   */
  drawX(locator) {
    this.log(`  [-] drawX()`);

    const self = this;
    const element = self.findElement(locator, true);
    const id = getId();

    self.wd.executeScript(`
      var element = arguments[0];
      var rect = element.getBoundingClientRect();

      // create canvas
      var canvas = document.createElement('canvas');
      canvas.id = "${id}";
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      canvas.style.left = window.scrollX + 'px';
      canvas.style.top = window.scrollY + 'px';
      canvas.style.position = "absolute";
      canvas.style.zIndex = '99999';

      document.body.appendChild(canvas);

      var ctx = canvas.getContext("2d");

      ctx.beginPath();
      ctx.moveTo(rect.left, rect.top);
      ctx.lineTo(rect.left + rect.width, rect.top + rect.height);
      ctx.lineWidth  = 3;
      ctx.strokeStyle = '#f00';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rect.left + rect.width, rect.top);
      ctx.lineTo(rect.left, rect.top + rect.height);
      ctx.lineWidth  = 3;
      ctx.strokeStyle = '#f00';
      ctx.stroke();

      return;
    `, element)
    .then(function () {
      return self.findElement(`[id="${id}"]`);
    });
  }

  /**
   * Take a screenshot on an element
   * @param {(string|WebElement)} locator Element locator
   * @param {string} filename File name (.png) of the screenshot
   * @param {{x: number, y: number}} [offset={x: 0, y: 0}] An offset from an element
   *
   * References for detecting Retina: http://stackoverflow.com/questions/19689715
   */
  takeElementShot(locator, filename, offset = {x: 0, y: 0}) {
    this.log(`  [-] takeElementShot()`);

    const self = this;
    const element = self.findElement(locator, true);

    if (!filename.endsWith('.png')) filename += '.png';

    const script_firefox = `
      var element = arguments[0];
      var screenData = arguments[1];
      var offsetX = arguments[2];
      var offsetY = arguments[3];
      var callback = arguments[4];

      var rect = element.getBoundingClientRect();

      var canvas = document.createElement('canvas');

      var image = new Image();

      image.onload = function () {
        canvas.width = rect.width;
        canvas.height = rect.height;

        canvas.getContext('2d').drawImage(
          this,
          window.scrollX + rect.left + offsetX,
          window.scrollY + rect.top + offsetY,
          rect.width,
          rect.height,
          0,
          0,
          rect.width,
          rect.height
        );

        callback(canvas.toDataURL());
      };

      image.src = 'data:image/png;base64,' + screenData;
    `;

    const script_chrome = `
      var element = arguments[0];
      var screenData = arguments[1];
      var offsetX = arguments[2];
      var offsetY = arguments[3];
      var callback = arguments[4];

      function isRetinaDisplay() {
        if (window.matchMedia) {
          var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
          return (mq && mq.matches || (window.devicePixelRatio > 1));
        }
      }

      var ratio = (isRetinaDisplay()) ? 2 : 1;

      var rect = element.getBoundingClientRect();

      var image = new Image();
      image.src = 'data:image/png;base64,' + screenData;

      var canvas = document.createElement('canvas');
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(
        image,
        (rect.left + offsetX) * ratio,
        (rect.top + offsetY) * ratio,
        rect.width * ratio,
        rect.height * ratio,
        0,
        0,
        rect.width * ratio,
        rect.height * ratio
      );
       callback(canvas.toDataURL());
    `;

    const script = (self.browser === 'firefox') ? script_firefox : script_chrome;

    self.wd.takeScreenshot().then(function (screenData) {
      self.wd.executeAsyncScript(`
        ${script}
      `, element, screenData, offset.x, offset.y)
      .then(function (elementData) {
        const base64Data = elementData.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(filename, base64Data, 'base64', function (err) {
          if(err) console.error(err);
        });
      });
    });
  }

  /**
   * Take a screenshot on a scroll element
   * @param {(string|WebElement)} locator Element locator
   * @param {string} filename File name (.png) of the screenshot
   * @param {{x: number, y: number}} [offset={x: 0, y: 0}] An offset from an element
   */
  takeScrollShot(locator, filename, offset={x: 0, y: 0}) {
    this.log(`  [-] takeScrollShot()`);

    const self = this;
    const element = self.findElement(locator, true);

    self.wd.executeScript(`
      var element = arguments[0];

      while ((element.scrollHeight <= element.offsetHeight ) || (parseInt(element.scrollWidth) >= 99000)) {
        element = element.parentElement;
      }

      window.easydriverScrollElement = element;

      var old_maxWidth = element.style.maxWidth;
      element.style.maxWidth = 'none';
      var old_maxHeight = element.style.maxHeight;
      element.style.maxHeight = 'none';

      var old_width = element.clientWidth;
      element.style.width = element.scrollWidth + "px";
      var old_height = element.clientHeight;
      element.style.height = element.scrollHeight + "px";

      return {mW: old_maxWidth, mH: old_maxHeight, w: old_width, h: old_height};
    `, element).then(function (scrollData) {
      self.takeElementShot(element, filename, offset);

      self.wd.executeScript(`
        var scrollData = arguments[0];

        window.easydriverScrollElement.style.maxWidth = scrollData.mW;
      	window.easydriverScrollElement.style.maxHeight = scrollData.mH;

      	window.easydriverScrollElement.style.height = scrollData.h + "px";
      	window.easydriverScrollElement.style.width = scrollData.w + "px";
      `, scrollData);
    });
  }

  /*--- *************************** ---*/
  /*--- Not-yet-implemented Methods ---*/
  /*--- *************************** ---*/

  // TODO: https://www.npmjs.com/package/css-selector-parser
  // TODO: https://www.npmjs.com/package/firefox-profile
  // TODO: https://www.npmjs.com/package/webdriver-sizzle-promised
  // TODO: https://www.npmjs.com/package/html-dnd
  // TODO: https://www.npmjs.com/package/selenium-query
  // TODO: https://github.com/mcherryleigh/webdriver-marker/blob/master/index.js

}

// --- Internal Functions --- //

function getId() {
  return 'easydriver_' + Math.random().toString(32).slice(2);
}

function parseLocator (locator) {
  const result = locator.match(/^([A-Za-z]+)=.+/);
  if (result) {
    const type = result[1].toLowerCase();
    const actualLocator = locator.substring(type.length + 1);
    return { type: type, string: actualLocator };
  }
  return { type: 'implicit', string: locator };
}

function regionToLowerCase(locale) {
  return locale.replace("_","-").replace(
    /(-[a-zA-Z]{2})$/,
    function (match) {
      return match.toLowerCase();
    }
  );
}

function regionToUpperCase(locale) {
  return locale.replace("_","-").replace(
    /(-[a-zA-Z]{2})$/,
    function (match) {
      return match.toUpperCase();
    }
  );
}

module.exports = EasyDriver;
