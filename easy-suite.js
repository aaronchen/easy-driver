'use strict';

const fs = require('fs-extra');
const test = require('selenium-webdriver/testing');

/*--- ****************************** ---*/
/*--- Preliminary Test Suite Support ---*/
/*--- ****************************** ---*/

class EasySuite {
  /**
   * @param {string} [name='EasyDriver TestSuite'] Test suite name
  */
  constructor(name = 'EasyDriver TestSuite') {
    this.name = name;
    this.pre = function(){};
    this.post = function(){};
    this.testcases = {};
    this.executables = [];
    this.timeout = 60000;
  }

  /**
   * Environment Setup for the test suite
   * @param {Function} fn Function to run before any test cases are executed
   */
  before(fn) {
    if (fn instanceof Function) this.pre = fn;
  }

  /**
   * Environment Cleanup for the test suite
   * @param {Function} fn Function to run after all test cases are executed
   */
  after(fn) {
    if (fn instanceof Function) this.post = fn;
  }

  /**
   * Only test cases identified can be run
   * @param {Object[]} testcases Array of testcases to run
   */
  only(testcases) {
    if (Array.isArray(testcases)) this.executables = testcases;
  }

  /**
   * Only test cases (by locale) identified in JSON file can be run
   * @param {string} filename JSON filename
   * @param {string} [locale = 'en'] Test cases of a certain locale in JSON
   */
  onlyJSON(filename, locale = 'en') {
    const data = fs.readJSONSync(filename);
    if (Array.isArray(data[locale])) this.executables = data[locale];
  }

  /**
   * Add test case to the test suite
   * @param {string} name Name of the test case
   * @param {Function} fn Function to run for the test case
   */
  testcase(name, fn) {
    if (name && fn instanceof Function) this.testcases[name] = function (done) { fn(); done(); };
  }

  /**
   * Execute test cases in the test suite
   */
  run() {
    const self = this;
    test.describe(self.name, function () {

      this.timeout(self.timeout);

      test.before(self.pre);
      test.after(self.post);

      for (let testcase in self.testcases) {
        if (self.executables.length > 0) {
          if (self.executables.includes(testcase)) {
            test.it(testcase, self.testcases[testcase]);
          }
          else {
            test.it.skip(testcase, self.testcases[testcase]);
          }
        } else {
          test.it(testcase, self.testcases[testcase]);
        }
      }
    });
  }
}

module.exports = EasySuite;
