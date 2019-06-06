/*--- ********************* ---*/
/*--- EasyDriver Test Suite ---*/
/*--- ********************* ---*/

// Test Cases to test EasyDriver methods.

const EasyDriver = require("../easy-driver");
const test = require("selenium-webdriver/testing");
const assert = require("selenium-webdriver/testing/assert");

test.describe("=== EasyDriver Test Suite ===", function() {
  let easyd;
  let imgPrefix = "test_img";

  // this.timeout(60000);

  test.before(function() {
    easyd = new EasyDriver({ locale: "ja", browser: "chrome" });
    easyd.createDirectories(imgPrefix);
    imgPrefix += `/${easyd.browser}`;
  });

  test.after(function() {
    easyd.quit();
  });

  test.it("Test Case: implicit-wait on click()", function(done) {
    easyd.open("https://jsfiddle.net/9snhn98w/show/");
    easyd.switchToFrame(0);
    easyd.click("id=p1");
    easyd.click("id=p2");
    easyd.click("id=p3");
    easyd.getText("id=desc").then(function(text) {
      assert(text).equalTo("Hahahaha");
    });
    done();
  });

  test.it("Test Case: getRect()", function(done) {
    easyd.getRect("id=p3").then(function(rect) {
      console.log(rect);
      assert(rect.width).greaterThan(20);
    });
    done();
  });

  test.it("Test Case: drawFlyover()", function(done) {
    easyd.setAttribute("id=p3", "title", "fake flyover here");
    easyd.drawFlyover("id=p3");
    easyd.takeScreenshot(`${imgPrefix}_drawFlyover.png`);
    easyd.clearAllDrawings();
    done();
  });

  test.it("Test Case: drawArrow()", function(done) {
    easyd.drawArrow("id=p1", "id=desc");
    easyd.focus("id=p1");
    easyd.takeScreenshot(`${imgPrefix}_drawArrow.png`);
    done();
  });

  test.it("Test Case: takeElementShot()", function(done) {
    easyd.open("https://www.google.com");
    easyd.sendKeys("name=q", "webdriver" + easyd.Key.ENTER);
    easyd.waitForVisible("id=rso");
    easyd.scrollIntoView("id=fbarcnt");
    easyd.takeElementShot("id=foot", `${imgPrefix}_takeElementShot_1.png`);
    done();
  });

  test.it("Test Case: takeElementShot() & Implicit Wait", function(done) {
    easyd.open("https://jsfiddle.net/aaronchen/w06ehb9v/show/");
    easyd.getRect("//iframe").then(function(rect) {
      easyd.switchToFrame(0);
      easyd.takeElementShot("id=p1", `${imgPrefix}_takeElementShot_2.png`, {
        x: rect.x,
        y: rect.y
      });
    });
    done();
  });

  test.it("Test Case: checkAll() and unCheckAll()", function(done) {
    easyd.open("https://jsfiddle.net/aaronchen/8w0zyuyu/show/");
    easyd.switchToFrame("//iframe");
    easyd.checkAll("//form");
    easyd.isSelected('[value="Bus"]').then(function(isSelected) {
      assert(isSelected).isTrue();
    });
    easyd.unCheckAll("//form");
    easyd.isSelected('[value="Train"]').then(function(isSelected) {
      assert(isSelected).isFalse();
    });
    done();
  });

  test.it("Test Case: waitForAlertIsPresent()", function(done) {
    easyd.open("https://jsfiddle.net/aaronchen/8mgdc90t/show/");
    easyd.switchToFrame("//iframe");
    easyd.click("#bAlert");
    easyd.waitForAlertIsPresent().then(function(alert) {
      alert.getText().then(function(text) {
        assert(text).equalTo("I am an alert box!");
      });
      alert.accept();
    });
    done();
  });

  test.it("Test Case: drawSelect()", function(done) {
    easyd.drawSelect("#dropdown");
    easyd.drawRedMark('[id*="easydriver_"]');
    easyd.takeScreenshot(`${imgPrefix}_drawSelect.png`);
    done();
  });

  test.it("Test Case: takeScrollShot()", function(done) {
    easyd.open("https://jsfiddle.net/aaronchen/x86j7qo2/show/");
    easyd.getRect("//iframe").then(function(rect) {
      easyd.switchToFrame(0);
      easyd.takeScrollShot("id=c1", `${imgPrefix}_takeScrollShot_1.png`, {
        x: rect.x,
        y: rect.y
      });
      easyd.takeScrollShot("id=c2", `${imgPrefix}_takeScrollShot_2.png`, {
        x: rect.x,
        y: rect.y
      });
      // Need to find a solution for this scroll element
      easyd.takeScrollShot("id=c3", `${imgPrefix}_takeScrollShot_3.png`, {
        x: rect.x,
        y: rect.y
      });
      easyd.takeScrollShot("id=c4", `${imgPrefix}_takeScrollShot_4.png`, {
        x: rect.x,
        y: rect.y
      });
    });
    done();
  });

  test.it("Test Case: rightClick()", function(done) {
    easyd.open("https://jsfiddle.net/aaronchen/6xo7myv2/show/");
    easyd.switchToFrame(0);
    easyd.rightClick("id=p1");
    easyd.mouseMove("css=li:eq(2)");
    easyd.takeScreenshot(`${imgPrefix}_rightClick.png`);
    done();
  });

  test.it("Test Case: drawValidation()", function(done) {
    easyd.open("https://jsfiddle.net/aaronchen/p4rtyh6f/show/");
    easyd.switchToFrame(0);
    easyd.sendKeys("id=password1", "aaaaaaa");
    easyd.click('css=[type="submit"]');
    easyd.drawValidation("id=password1");
    easyd.takeScreenshot(`${imgPrefix}_drawValidation.png`);
    done();
  });

  test.it("Test Case: trigger()", function(done) {
    easyd.open("https://jsfiddle.net/aaronchen/audbkq31/show/");
    easyd.switchToFrame(0);
    easyd.trigger("id=btn1", "click");
    easyd.trigger("id=btn1", "customEvent1");
    easyd.getText("id=result").then(function(text) {
      assert(text).contains("click1");
      assert(text).contains("click2");
      assert(text).contains("customEvent1");
    });
    done();
  });

  test.it("Test Case: alertAccept(), alertDismiss(), alertSendKeys()", function(
    done
  ) {
    easyd.open("https://jsfiddle.net/aaronchen/7na34jne/show/");
    easyd.switchToFrame(0);
    easyd.click("#bAlert");
    easyd.alertAccept();
    easyd.click("#bConfirm");
    easyd.alertDismiss();
    easyd.getText("id=result").then(function(text) {
      assert(text).contains("No");
    });
    easyd.click("#bPrompt");
    easyd.alertSendKeys("fdafds");
    easyd.getText("id=result").then(function(text) {
      assert(text).contains("fdafds");
    });
    done();
  });
});
