<a name="EasyDriver"></a>

## EasyDriver
**Kind**: global class  

* [EasyDriver](#EasyDriver)
    * [new EasyDriver([options])](#new_EasyDriver_new)
    * [.actions()](#EasyDriver+actions) ⇒ <code>ActionSequence</code>
    * [.addCookie(name, value, minutes)](#EasyDriver+addCookie) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.activeElement()](#EasyDriver+activeElement) ⇒ <code>WebElementPromise</code>
    * [.alertAccept()](#EasyDriver+alertAccept) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.alertDismiss()](#EasyDriver+alertDismiss) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.alertSendKeys(text)](#EasyDriver+alertSendKeys) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.back()](#EasyDriver+back) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.blank()](#EasyDriver+blank) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.close()](#EasyDriver+close) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.deleteAllCookies()](#EasyDriver+deleteAllCookies) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.deleteCookie(name)](#EasyDriver+deleteCookie) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.findElement(locator, [isVisible])](#EasyDriver+findElement) ⇒ <code>WebElementPromise</code>
    * [.findElements(locator)](#EasyDriver+findElements) ⇒ <code>Thenable.&lt;Array.&lt;WebElement&gt;&gt;</code>
    * [.forward()](#EasyDriver+forward) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.getAllWindowHandles()](#EasyDriver+getAllWindowHandles) ⇒ <code>Thenable.&lt;Array.&lt;string&gt;&gt;</code>
    * [.getCookie(name)](#EasyDriver+getCookie) ⇒ <code>Thenable.&lt;(Options.Cookie\|null)&gt;</code>
    * [.getCookies()](#EasyDriver+getCookies) ⇒ <code>Thenable.&lt;Array.&lt;Options.Cookie&gt;&gt;</code>
    * [.getTitle()](#EasyDriver+getTitle) ⇒ <code>Thenable.&lt;string&gt;</code>
    * [.getWindowHandle()](#EasyDriver+getWindowHandle) ⇒ <code>Thenable.&lt;string&gt;</code>
    * [.locateElementBy(locator)](#EasyDriver+locateElementBy) ⇒ <code>By</code>
    * [.log(msg)](#EasyDriver+log)
    * [.maximizeWindow()](#EasyDriver+maximizeWindow) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.maximizeToScreenSize()](#EasyDriver+maximizeToScreenSize) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.open(url)](#EasyDriver+open) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.openWindow(name)](#EasyDriver+openWindow) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.quit()](#EasyDriver+quit) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.refresh()](#EasyDriver+refresh) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.runScript(script, fn)](#EasyDriver+runScript)
    * [.setPageLoadTimeout(ms)](#EasyDriver+setPageLoadTimeout) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.setScriptTimeout(ms)](#EasyDriver+setScriptTimeout) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.setTimeout(ms)](#EasyDriver+setTimeout)
    * [.setWindowPosition(x, y)](#EasyDriver+setWindowPosition) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.setWindowSize(width, height)](#EasyDriver+setWindowSize) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.sleep(ms)](#EasyDriver+sleep) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.switchToAlert()](#EasyDriver+switchToAlert) ⇒ <code>AlertPromise</code>
    * [.switchToDefaultContent()](#EasyDriver+switchToDefaultContent) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.switchToFirstWindow()](#EasyDriver+switchToFirstWindow) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.switchToFrame(locator)](#EasyDriver+switchToFrame) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.switchToLastWindow()](#EasyDriver+switchToLastWindow) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.switchToWindow(nameOrHandle)](#EasyDriver+switchToWindow) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.takeScreenshot(filename)](#EasyDriver+takeScreenshot)
    * [.wait(condition, [timeout])](#EasyDriver+wait) ⇒ <code>Thenable</code>
    * [.waitForAlertIsPresent()](#EasyDriver+waitForAlertIsPresent) ⇒ <code>Thenable.&lt;Alert&gt;</code>
    * [.waitForTitleContains(substr)](#EasyDriver+waitForTitleContains) ⇒ <code>Thenable</code>
    * [.waitForTitleIs(title)](#EasyDriver+waitForTitleIs) ⇒ <code>Thenable</code>
    * [.waitForTitleMatches(regex)](#EasyDriver+waitForTitleMatches) ⇒ <code>Thenable</code>
    * [.waitForUrlContains(substrUrl)](#EasyDriver+waitForUrlContains) ⇒ <code>Thenable</code>
    * [.waitForUrlIs(url)](#EasyDriver+waitForUrlIs) ⇒ <code>Thenable</code>
    * [.waitForUrlMatches(regex)](#EasyDriver+waitForUrlMatches) ⇒ <code>Thenable</code>
    * [.zoom(scale)](#EasyDriver+zoom) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.blur(locator)](#EasyDriver+blur) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.checkAll(locator)](#EasyDriver+checkAll)
    * [.clear(locator)](#EasyDriver+clear) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.click(locator)](#EasyDriver+click) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.clickAt(locator, [offset])](#EasyDriver+clickAt) ⇒ <code>Thenable</code>
    * [.doubleClick(locator, [offset])](#EasyDriver+doubleClick) ⇒ <code>Thenable</code>
    * [.dragAndDrop(from_locator, to_locator)](#EasyDriver+dragAndDrop) ⇒ <code>Thenable</code>
    * [.focus(locator)](#EasyDriver+focus) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.getAttribute(locator, attributeName)](#EasyDriver+getAttribute) ⇒ <code>Thenable.&lt;(string\|null)&gt;</code>
    * [.getRect(locator)](#EasyDriver+getRect) ⇒ <code>Thenable.&lt;{x: number, y: number, width: number, height: number}&gt;</code>
    * [.getTagName(locator)](#EasyDriver+getTagName) ⇒ <code>Thenable.&lt;string&gt;</code>
    * [.getText(locator)](#EasyDriver+getText) ⇒ <code>Thenable.&lt;string&gt;</code>
    * [.hasAttribute(locator, attributeName)](#EasyDriver+hasAttribute) ⇒ <code>Thenable.&lt;boolean&gt;</code>
    * [.hide(locator)](#EasyDriver+hide) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.highlight(locator)](#EasyDriver+highlight) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.isDisplayed(locator)](#EasyDriver+isDisplayed) ⇒ <code>Thenable.&lt;boolean&gt;</code>
    * [.isEnabled(locator)](#EasyDriver+isEnabled) ⇒ <code>Thenable.&lt;boolean&gt;</code>
    * [.isSelected(locator)](#EasyDriver+isSelected) ⇒ <code>Thenable.&lt;boolean&gt;</code>
    * [.mouseMove(locator, [offset])](#EasyDriver+mouseMove) ⇒ <code>Thenable</code>
    * [.move(from_locator, to_locator)](#EasyDriver+move) ⇒ <code>Thenable</code>
    * [.removeAttribute(locator, attributeName)](#EasyDriver+removeAttribute) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.rightClick(locator)](#EasyDriver+rightClick) ⇒ <code>Thenable</code>
    * [.rightClickAt(locator, [offset])](#EasyDriver+rightClickAt) ⇒ <code>Thenable</code>
    * [.scrollIntoView(locator)](#EasyDriver+scrollIntoView) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.select(select_locator, option_locator)](#EasyDriver+select) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.sendKeys(locator, ...keys)](#EasyDriver+sendKeys) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.setAttribute(select_locator, attribute, value)](#EasyDriver+setAttribute)
    * [.show(locator)](#EasyDriver+show) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.submit(locator)](#EasyDriver+submit) ⇒ <code>Thenable.&lt;undefined&gt;</code>
    * [.trigger(locator, eventName)](#EasyDriver+trigger) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.unCheckAll(locator)](#EasyDriver+unCheckAll)
    * [.visible(locator, [isVisible])](#EasyDriver+visible) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.waitForDisabled(locator)](#EasyDriver+waitForDisabled) ⇒ <code>Thenable</code>
    * [.waitForEnabled(locator)](#EasyDriver+waitForEnabled) ⇒ <code>Thenable</code>
    * [.waitForNotPresent(locator)](#EasyDriver+waitForNotPresent) ⇒ <code>Thenable</code>
    * [.waitForNotSelected(locator)](#EasyDriver+waitForNotSelected) ⇒ <code>Thenable</code>
    * [.waitForNotVisible(locator)](#EasyDriver+waitForNotVisible) ⇒ <code>Thenable</code>
    * [.waitForPresent(locator)](#EasyDriver+waitForPresent) ⇒ <code>Thenable</code>
    * [.waitForSelected(locator)](#EasyDriver+waitForSelected) ⇒ <code>Thenable</code>
    * [.waitForSwitchToFrame(locator)](#EasyDriver+waitForSwitchToFrame) ⇒ <code>Thenable</code>
    * [.waitForTextContains(locator, substr)](#EasyDriver+waitForTextContains) ⇒ <code>Thenable</code>
    * [.waitForTextIs(locator, text)](#EasyDriver+waitForTextIs) ⇒ <code>Thenable</code>
    * [.waitForTextMatches(locator, regex)](#EasyDriver+waitForTextMatches) ⇒ <code>Thenable</code>
    * [.waitForVisible(locator)](#EasyDriver+waitForVisible) ⇒ <code>Thenable</code>
    * [.clearAllDrawings()](#EasyDriver+clearAllDrawings) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
    * [.createDirectories(dirtree)](#EasyDriver+createDirectories)
    * [.drawAlert()](#EasyDriver+drawAlert) ⇒ <code>WebElementPromise</code>
    * [.drawArrow(from_locator, to_locator)](#EasyDriver+drawArrow) ⇒ <code>WebElementPromise</code>
    * [.drawColorFill(locator, [color])](#EasyDriver+drawColorFill) ⇒ <code>WebElementPromise</code>
    * [.drawConfirmation([dismiss])](#EasyDriver+drawConfirmation) ⇒ <code>WebElementPromise</code>
    * [.drawFlyover(locator, [settings])](#EasyDriver+drawFlyover) ⇒ <code>WebElementPromise</code>
    * [.drawRedMark(locator, [padding])](#EasyDriver+drawRedMark) ⇒ <code>WebElementPromise</code>
    * [.drawSelect(locator, [offset])](#EasyDriver+drawSelect) ⇒ <code>WebElementPromise</code>
    * [.drawText(locator, text, [settings])](#EasyDriver+drawText) ⇒ <code>WebElementPromise</code>
    * [.drawValidation(locator, [offset])](#EasyDriver+drawValidation) ⇒ <code>WebElementPromise</code>
    * [.drawX(locator)](#EasyDriver+drawX) ⇒ <code>WebElementPromise</code>
    * [.takeElementShot(locator, filename, [offset])](#EasyDriver+takeElementShot)
    * [.takeScrollShot(locator, filename, [offset])](#EasyDriver+takeScrollShot)

<a name="new_EasyDriver_new"></a>

### new EasyDriver([options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{browser: &#x27;chrome&#x27;, locale: &#x27;en&#x27;}</code> | Driver Options.    `browser` is either 'chrome' (default) or 'firefox'.  `locale` is 'en' by default. |

<a name="EasyDriver+actions"></a>

### easyDriver.actions() ⇒ <code>ActionSequence</code>
Create a new action sequence

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
**Returns**: <code>ActionSequence</code> - A new action sequence.  
<a name="EasyDriver+addCookie"></a>

### easyDriver.addCookie(name, value, minutes) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Add a cookie

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the cookie |
| value | <code>string</code> | Value of the cookie |
| minutes | <code>number</code> | Minutes after the cookie expires |

<a name="EasyDriver+activeElement"></a>

### easyDriver.activeElement() ⇒ <code>WebElementPromise</code>
Retrieve the document.activeElement element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+alertAccept"></a>

### easyDriver.alertAccept() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Accept an alert/confirm/prompt dialog

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+alertDismiss"></a>

### easyDriver.alertDismiss() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Dismiss a confirm/prompt dialog

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+alertSendKeys"></a>

### easyDriver.alertSendKeys(text) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Send Keys to window.prompt() and accept the dialog

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | Text to send into prompt dialog |

<a name="EasyDriver+back"></a>

### easyDriver.back() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Move backwards in the browser history

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+blank"></a>

### easyDriver.blank() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Open a blank page

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+close"></a>

### easyDriver.close() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Close the current window

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+deleteAllCookies"></a>

### easyDriver.deleteAllCookies() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Delete all cookies visible to the current page

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+deleteCookie"></a>

### easyDriver.deleteCookie(name) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Delete a cookie

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the cookie |

<a name="EasyDriver+findElement"></a>

### easyDriver.findElement(locator, [isVisible]) ⇒ <code>WebElementPromise</code>
Find Element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
**Returns**: <code>WebElementPromise</code> - A WebElement that can be used to issue commands against the located element.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> |  | Element locator |
| [isVisible] | <code>bool</code> | <code>false</code> | Wait until WebElement is visible |

<a name="EasyDriver+findElements"></a>

### easyDriver.findElements(locator) ⇒ <code>Thenable.&lt;Array.&lt;WebElement&gt;&gt;</code>
Find Elements

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
**Returns**: <code>Thenable.&lt;Array.&lt;WebElement&gt;&gt;</code> - A promise that will resolve to an array of WebElements.  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> | Element locator |

<a name="EasyDriver+forward"></a>

### easyDriver.forward() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Move forwards in the browser history

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+getAllWindowHandles"></a>

### easyDriver.getAllWindowHandles() ⇒ <code>Thenable.&lt;Array.&lt;string&gt;&gt;</code>
Get All Window Handles

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
**Returns**: <code>Thenable.&lt;Array.&lt;string&gt;&gt;</code> - A promise that will be resolved with an array of window handles.  
<a name="EasyDriver+getCookie"></a>

### easyDriver.getCookie(name) ⇒ <code>Thenable.&lt;(Options.Cookie\|null)&gt;</code>
Get a cookie

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the cookie |

<a name="EasyDriver+getCookies"></a>

### easyDriver.getCookies() ⇒ <code>Thenable.&lt;Array.&lt;Options.Cookie&gt;&gt;</code>
Get all cookies

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+getTitle"></a>

### easyDriver.getTitle() ⇒ <code>Thenable.&lt;string&gt;</code>
Get title

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
**Returns**: <code>Thenable.&lt;string&gt;</code> - A promise that will be resolved with the current page's title.  
<a name="EasyDriver+getWindowHandle"></a>

### easyDriver.getWindowHandle() ⇒ <code>Thenable.&lt;string&gt;</code>
Get Window Handle

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
**Returns**: <code>Thenable.&lt;string&gt;</code> - A promise that will be resolved with the current window's handle.  
<a name="EasyDriver+locateElementBy"></a>

### easyDriver.locateElementBy(locator) ⇒ <code>By</code>
Locate element 'By' strategies

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
**Returns**: <code>By</code> - A new By locator.  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> | Element locator with: strategy=search_string |

<a name="EasyDriver+log"></a>

### easyDriver.log(msg)
Log messages

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Messages to log |

<a name="EasyDriver+maximizeWindow"></a>

### easyDriver.maximizeWindow() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Maximize the window

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+maximizeToScreenSize"></a>

### easyDriver.maximizeToScreenSize() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Maximize the window to the screen size

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+open"></a>

### easyDriver.open(url) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Open URL

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | A fully qualified URL to open |

<a name="EasyDriver+openWindow"></a>

### easyDriver.openWindow(name) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Open a new blank window

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the new window |

<a name="EasyDriver+quit"></a>

### easyDriver.quit() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Terminates the browser session

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+refresh"></a>

### easyDriver.refresh() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Refresh the page

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+runScript"></a>

### easyDriver.runScript(script, fn)
Run script

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| script | <code>string</code> &#124; <code>function</code> | The script to execute |
| fn | <code>function</code> | A callback function aftrer the script is executed |

<a name="EasyDriver+setPageLoadTimeout"></a>

### easyDriver.setPageLoadTimeout(ms) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Sets the amount of time to wait for a page load

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | The amount of time to wait, in milliseconds.  If negative, page loads may be indefinite. |

<a name="EasyDriver+setScriptTimeout"></a>

### easyDriver.setScriptTimeout(ms) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Set the timeout for asynchronous scripts

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Timeout in milliseconds |

<a name="EasyDriver+setTimeout"></a>

### easyDriver.setTimeout(ms)
Set the timeout for 'Wait'

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Timeout in milliseconds |

<a name="EasyDriver+setWindowPosition"></a>

### easyDriver.setWindowPosition(x, y) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Set window's position

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The desired horizontal position, relative to the left side of the screen |
| y | <code>number</code> | The desired vertical position, relative to the top of the of the screen |

<a name="EasyDriver+setWindowSize"></a>

### easyDriver.setWindowSize(width, height) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Set window's size

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | The desired window width |
| height | <code>number</code> | The desired window height |

<a name="EasyDriver+sleep"></a>

### easyDriver.sleep(ms) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Sleep

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | The amount of time, in milliseconds, to sleep |

<a name="EasyDriver+switchToAlert"></a>

### easyDriver.switchToAlert() ⇒ <code>AlertPromise</code>
Switch to window.alert(), window.confirm(), or window.prompt()

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+switchToDefaultContent"></a>

### easyDriver.switchToDefaultContent() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Switch to the default content

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+switchToFirstWindow"></a>

### easyDriver.switchToFirstWindow() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Switch to first window

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+switchToFrame"></a>

### easyDriver.switchToFrame(locator) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Switch to frame

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>number</code> &#124; <code>string</code> &#124; <code>WebElement</code> | The frame locator |

<a name="EasyDriver+switchToLastWindow"></a>

### easyDriver.switchToLastWindow() ⇒ <code>Thenable.&lt;undefined&gt;</code>
Switch to last-opened window

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+switchToWindow"></a>

### easyDriver.switchToWindow(nameOrHandle) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Switch to window

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| nameOrHandle | <code>string</code> | The name or window handle of the window to switch focus to |

<a name="EasyDriver+takeScreenshot"></a>

### easyDriver.takeScreenshot(filename)
Take a screenshot

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | File name (.png) of the screenshot |

<a name="EasyDriver+wait"></a>

### easyDriver.wait(condition, [timeout]) ⇒ <code>Thenable</code>
Wait

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | A function to evaluate as a condition |
| [timeout] | <code>number</code> | Wait timeout |

<a name="EasyDriver+waitForAlertIsPresent"></a>

### easyDriver.waitForAlertIsPresent() ⇒ <code>Thenable.&lt;Alert&gt;</code>
Wait till an alert is presented

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+waitForTitleContains"></a>

### easyDriver.waitForTitleContains(substr) ⇒ <code>Thenable</code>
Wait till Title contains substr

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| substr | <code>string</code> | The substring that should be present in the page title |

<a name="EasyDriver+waitForTitleIs"></a>

### easyDriver.waitForTitleIs(title) ⇒ <code>Thenable</code>
Wait till Title is title

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The expected page title |

<a name="EasyDriver+waitForTitleMatches"></a>

### easyDriver.waitForTitleMatches(regex) ⇒ <code>Thenable</code>
Wait till Title matches regex

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| regex | <code>RegExp</code> | The regular expression to test against |

<a name="EasyDriver+waitForUrlContains"></a>

### easyDriver.waitForUrlContains(substrUrl) ⇒ <code>Thenable</code>
Wait till URL contains substrUrl

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| substrUrl | <code>string</code> | The substring that should be present in the current URL |

<a name="EasyDriver+waitForUrlIs"></a>

### easyDriver.waitForUrlIs(url) ⇒ <code>Thenable</code>
Wait till URL is url

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The expected page url |

<a name="EasyDriver+waitForUrlMatches"></a>

### easyDriver.waitForUrlMatches(regex) ⇒ <code>Thenable</code>
Wait till URL matches regex

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| regex | <code>RegExp</code> | The regular expression to test against |

<a name="EasyDriver+zoom"></a>

### easyDriver.zoom(scale) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Zoom in/out of a window

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>number</code> | Scale of zoom |

<a name="EasyDriver+blur"></a>

### easyDriver.blur(locator) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Remove focus from an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+checkAll"></a>

### easyDriver.checkAll(locator)
Check all checkboxes under an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+clear"></a>

### easyDriver.clear(locator) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Clear the value of an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+click"></a>

### easyDriver.click(locator) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Click an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+clickAt"></a>

### easyDriver.clickAt(locator, [offset]) ⇒ <code>Thenable</code>
Click an element with an offset

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [offset] | <code>Object</code> | <code>{x: 0, y: 0}</code> | An offset within the element |

<a name="EasyDriver+doubleClick"></a>

### easyDriver.doubleClick(locator, [offset]) ⇒ <code>Thenable</code>
Double-click an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [offset] | <code>Object</code> | <code>{x: 0, y: 0}</code> | An offset within the element |

<a name="EasyDriver+dragAndDrop"></a>

### easyDriver.dragAndDrop(from_locator, to_locator) ⇒ <code>Thenable</code>
Drag and drop

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| from_locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| to_locator | <code>string</code> &#124; <code>WebElement</code> &#124; <code>Object</code> | The location to drag to,             either as another locator or an offset in pixels. |

<a name="EasyDriver+focus"></a>

### easyDriver.focus(locator) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Give focus to an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+getAttribute"></a>

### easyDriver.getAttribute(locator, attributeName) ⇒ <code>Thenable.&lt;(string\|null)&gt;</code>
Get attribute value of an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| attributeName | <code>string</code> | The name of the attribute to query |

<a name="EasyDriver+getRect"></a>

### easyDriver.getRect(locator) ⇒ <code>Thenable.&lt;{x: number, y: number, width: number, height: number}&gt;</code>
Get Position and Size of an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+getTagName"></a>

### easyDriver.getTagName(locator) ⇒ <code>Thenable.&lt;string&gt;</code>
Get Get tag name of an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+getText"></a>

### easyDriver.getText(locator) ⇒ <code>Thenable.&lt;string&gt;</code>
Get Get the visible innerText of an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+hasAttribute"></a>

### easyDriver.hasAttribute(locator, attributeName) ⇒ <code>Thenable.&lt;boolean&gt;</code>
Check if an element has the specified attribute

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| attributeName | <code>string</code> | The name of the attribute to check |

<a name="EasyDriver+hide"></a>

### easyDriver.hide(locator) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Hide an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+highlight"></a>

### easyDriver.highlight(locator) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Highlight an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+isDisplayed"></a>

### easyDriver.isDisplayed(locator) ⇒ <code>Thenable.&lt;boolean&gt;</code>
If an element is displayed

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+isEnabled"></a>

### easyDriver.isEnabled(locator) ⇒ <code>Thenable.&lt;boolean&gt;</code>
If an element is enabled

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+isSelected"></a>

### easyDriver.isSelected(locator) ⇒ <code>Thenable.&lt;boolean&gt;</code>
If an element is selected

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+mouseMove"></a>

### easyDriver.mouseMove(locator, [offset]) ⇒ <code>Thenable</code>
Move to an element by offset

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [offset] | <code>Object</code> | <code>{x: 0, y: 0}</code> | An offset within the element. |

<a name="EasyDriver+move"></a>

### easyDriver.move(from_locator, to_locator) ⇒ <code>Thenable</code>
Move an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| from_locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| to_locator | <code>string</code> &#124; <code>WebElement</code> &#124; <code>Object</code> | The location to move to,             either as another locator,  WebElement, or an offset in {x,y}. |

<a name="EasyDriver+removeAttribute"></a>

### easyDriver.removeAttribute(locator, attributeName) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Remove an attribute from an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| attributeName | <code>string</code> | The name of the attribute to remove |

<a name="EasyDriver+rightClick"></a>

### easyDriver.rightClick(locator) ⇒ <code>Thenable</code>
Right-click on an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+rightClickAt"></a>

### easyDriver.rightClickAt(locator, [offset]) ⇒ <code>Thenable</code>
Right-click on an element by offset

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [offset] | <code>Object</code> | <code>{x: 0, y: 0}</code> | An offset within the element. |

<a name="EasyDriver+scrollIntoView"></a>

### easyDriver.scrollIntoView(locator) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Scroll an element into view

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+select"></a>

### easyDriver.select(select_locator, option_locator) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Select an option in a drop-down menu

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| select_locator | <code>string</code> &#124; <code>WebElement</code> | SELECT element locator |
| option_locator | <code>string</code> | OPTION element locator |

<a name="EasyDriver+sendKeys"></a>

### easyDriver.sendKeys(locator, ...keys) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Send keys to an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| ...keys | <code>string</code> &#124; <code>Key</code> &#124; <code>Array.&lt;(string\|Key)&gt;</code> | Keys to send |

<a name="EasyDriver+setAttribute"></a>

### easyDriver.setAttribute(select_locator, attribute, value)
Set attribute value for an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| select_locator | <code>string</code> &#124; <code>WebElement</code> | SELECT element locator |
| attribute | <code>string</code> | attribute name |
| value | <code>string</code> | attribute value |

<a name="EasyDriver+show"></a>

### easyDriver.show(locator) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Show an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+submit"></a>

### easyDriver.submit(locator) ⇒ <code>Thenable.&lt;undefined&gt;</code>
Submit the form containing the element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+trigger"></a>

### easyDriver.trigger(locator, eventName) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Trigger an event on an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| eventName | <code>string</code> | Event Name |

<a name="EasyDriver+unCheckAll"></a>

### easyDriver.unCheckAll(locator)
Uncheck all checkboxes under an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+visible"></a>

### easyDriver.visible(locator, [isVisible]) ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Set visibility of an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [isVisible] | <code>bool</code> | <code>true</code> | visibility of the element |

<a name="EasyDriver+waitForDisabled"></a>

### easyDriver.waitForDisabled(locator) ⇒ <code>Thenable</code>
Wait till an element is disabled

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+waitForEnabled"></a>

### easyDriver.waitForEnabled(locator) ⇒ <code>Thenable</code>
Wait till an element is enabled

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+waitForNotPresent"></a>

### easyDriver.waitForNotPresent(locator) ⇒ <code>Thenable</code>
Wait till an element is not presented

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+waitForNotSelected"></a>

### easyDriver.waitForNotSelected(locator) ⇒ <code>Thenable</code>
Wait till an element is not selected

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+waitForNotVisible"></a>

### easyDriver.waitForNotVisible(locator) ⇒ <code>Thenable</code>
Wait till an element is not visible

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+waitForPresent"></a>

### easyDriver.waitForPresent(locator) ⇒ <code>Thenable</code>
Wait till an element is present

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+waitForSelected"></a>

### easyDriver.waitForSelected(locator) ⇒ <code>Thenable</code>
Wait till an element is selected

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+waitForSwitchToFrame"></a>

### easyDriver.waitForSwitchToFrame(locator) ⇒ <code>Thenable</code>
Wait till switching to a frame

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>number</code> &#124; <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+waitForTextContains"></a>

### easyDriver.waitForTextContains(locator, substr) ⇒ <code>Thenable</code>
Wait till an element's text contains substring

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| substr | <code>string</code> | The substring to search for |

<a name="EasyDriver+waitForTextIs"></a>

### easyDriver.waitForTextIs(locator, text) ⇒ <code>Thenable</code>
Wait till an element's innerText is text

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| text | <code>string</code> | The expected text |

<a name="EasyDriver+waitForTextMatches"></a>

### easyDriver.waitForTextMatches(locator, regex) ⇒ <code>Thenable</code>
Wait till an element's innerText matches regex

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| regex | <code>RegExp</code> | The regular expression to test against |

<a name="EasyDriver+waitForVisible"></a>

### easyDriver.waitForVisible(locator) ⇒ <code>Thenable</code>
Wait till an element is visible

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+clearAllDrawings"></a>

### easyDriver.clearAllDrawings() ⇒ <code>Thenable.&lt;(T\|null)&gt;</code>
Clear all elements created by EasyDriver

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+createDirectories"></a>

### easyDriver.createDirectories(dirtree)
Create directories

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| dirtree | <code>string</code> | Directories to create |

<a name="EasyDriver+drawAlert"></a>

### easyDriver.drawAlert() ⇒ <code>WebElementPromise</code>
Draw Alert

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  
<a name="EasyDriver+drawArrow"></a>

### easyDriver.drawArrow(from_locator, to_locator) ⇒ <code>WebElementPromise</code>
Draw an arrow between 2 element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| from_locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |
| to_locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+drawColorFill"></a>

### easyDriver.drawColorFill(locator, [color]) ⇒ <code>WebElementPromise</code>
Fill an element with color

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [color] | <code>string</code> | <code>&quot;&#x27;rgba(255,0,0,0.8)&#x27;&quot;</code> | Color to fill |

<a name="EasyDriver+drawConfirmation"></a>

### easyDriver.drawConfirmation([dismiss]) ⇒ <code>WebElementPromise</code>
Draw Confirmation

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dismiss] | <code>bool</code> | <code>false</code> | Dismiss confirmation (false means Accept) |

<a name="EasyDriver+drawFlyover"></a>

### easyDriver.drawFlyover(locator, [settings]) ⇒ <code>WebElementPromise</code>
Draw flyover for an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [settings] | <code>Object</code> | <code>{attribute: &#x27;title&#x27;, offsetX: 5, offsetY: 15, fromLastPos: false, drawSymbol: false}</code> | attribute: draw flyover on element's attribute,             offsetX: offset X from the element,             offsetY: offset Y from the element,             fromLastPos: draw from last Flyover position,             drawSymbol: draw symbol on the flyover. |

<a name="EasyDriver+drawRedMark"></a>

### easyDriver.drawRedMark(locator, [padding]) ⇒ <code>WebElementPromise</code>
Draw red-mark around an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [padding] | <code>Object</code> | <code>{top: 0, left: 0, bottom: 0, right: 0}</code> | Remark padding |

<a name="EasyDriver+drawSelect"></a>

### easyDriver.drawSelect(locator, [offset]) ⇒ <code>WebElementPromise</code>
Draw drop-down menu for SELECT element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [offset] | <code>Object</code> | <code>{x: 5, y: 15}</code> | Menu offset from the element |

<a name="EasyDriver+drawText"></a>

### easyDriver.drawText(locator, text, [settings]) ⇒ <code>WebElementPromise</code>
Draw Text after the element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| text | <code>string</code> |  | Text to draw |
| [settings] | <code>Object</code> | <code>{color: &#x27;#f00&#x27;, fontSize: 13, marginTop: 2, right: 20}</code> | Settings |

<a name="EasyDriver+drawValidation"></a>

### easyDriver.drawValidation(locator, [offset]) ⇒ <code>WebElementPromise</code>
Draw validationMessage of an form element as a flyover

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| [offset] | <code>Object</code> | <code>{x: 0, y: 0}</code> | Flyover offset from the element |

<a name="EasyDriver+drawX"></a>

### easyDriver.drawX(locator) ⇒ <code>WebElementPromise</code>
Cross out an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Description |
| --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> | Element locator |

<a name="EasyDriver+takeElementShot"></a>

### easyDriver.takeElementShot(locator, filename, [offset])
Take a screenshot on an element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| filename | <code>string</code> |  | File name (.png) of the screenshot |
| [offset] | <code>Object</code> | <code>{x: 0, y: 0}</code> | An offset from an element References for detecting Retina: http://stackoverflow.com/questions/19689715 |

<a name="EasyDriver+takeScrollShot"></a>

### easyDriver.takeScrollShot(locator, filename, [offset])
Take a screenshot on a scroll element

**Kind**: instance method of <code>[EasyDriver](#EasyDriver)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| locator | <code>string</code> &#124; <code>WebElement</code> |  | Element locator |
| filename | <code>string</code> |  | File name (.png) of the screenshot |
| [offset] | <code>Object</code> | <code>{x: 0, y: 0}</code> | An offset from an element |

