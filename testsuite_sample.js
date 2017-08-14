const EasyDriver = require('./easy-driver');
const EasySuite = require('./easy-suite');

const locale = process.env.EASYD_LOCALE || 'en';
const screen_dir = `testsuite/${locale}`;

const easyd = new EasyDriver({locale: locale});
const suite = new EasySuite('EasyDriver Test Suite');
easyd.VERBOSE = false;

suite.before(function() {
  easyd.log("Run Environment Setup Here");
  easyd.createDirectories(screen_dir);
});

suite.after(function() {
  easyd.log("Run Environment Cleanup Here");
  easyd.quit();
});

suite.testcase("010.010.010", function() {
  easyd.open('https://www.google.com');
  easyd.takeScreenshot(`${screen_dir}/010.010.010.png`);
  easyd.sleep(2000);
});

suite.testcase("010.010.020", function() {
  easyd.blank();
  easyd.open('https://www.mobile01.com');
  easyd.takeScreenshot(`${screen_dir}/010.010.020.png`);
  easyd.sleep(2000);
});

suite.testcase("010.020.010", function() {
  easyd.blank();
  easyd.open('https://www.nytimes.com');
  easyd.takeScreenshot(`${screen_dir}/010.020.010.png`);
  easyd.sleep(2000);
});

// Only run certain test cases
// suite.only(['010.010.010', "010.020.010"]);
// Or, only run test cases specified in JSON file
// suite.onlyJSON('testsuite_sample.json', locale);

suite.run();
