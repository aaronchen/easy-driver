<a name="EasySuite"></a>

## EasySuite
**Kind**: global class  

* [EasySuite](#EasySuite)
    * [new EasySuite([name])](#new_EasySuite_new)
    * [.before(fn)](#EasySuite+before)
    * [.after(fn)](#EasySuite+after)
    * [.only(testcases)](#EasySuite+only)
    * [.onlyJSON(filename, [locale])](#EasySuite+onlyJSON)
    * [.testcase(name, fn)](#EasySuite+testcase)
    * [.run()](#EasySuite+run)

<a name="new_EasySuite_new"></a>

### new EasySuite([name])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>string</code> | <code>&quot;&#x27;EasyDriver TestSuite&#x27;&quot;</code> | Test suite name |

<a name="EasySuite+before"></a>

### easySuite.before(fn)
Environment Setup for the test suite

**Kind**: instance method of <code>[EasySuite](#EasySuite)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to run before any test cases are executed |

<a name="EasySuite+after"></a>

### easySuite.after(fn)
Environment Cleanup for the test suite

**Kind**: instance method of <code>[EasySuite](#EasySuite)</code>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function to run after all test cases are executed |

<a name="EasySuite+only"></a>

### easySuite.only(testcases)
Only test cases identified can be run

**Kind**: instance method of <code>[EasySuite](#EasySuite)</code>  

| Param | Type | Description |
| --- | --- | --- |
| testcases | <code>Array.&lt;Object&gt;</code> | Array of testcases to run |

<a name="EasySuite+onlyJSON"></a>

### easySuite.onlyJSON(filename, [locale])
Only test cases (by locale) identified in JSON file can be run

**Kind**: instance method of <code>[EasySuite](#EasySuite)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| filename | <code>string</code> |  | JSON filename |
| [locale] | <code>string</code> | <code>&quot;&#x27;en&#x27;&quot;</code> | Test cases of a certain locale in JSON |

<a name="EasySuite+testcase"></a>

### easySuite.testcase(name, fn)
Add test case to the test suite

**Kind**: instance method of <code>[EasySuite](#EasySuite)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the test case |
| fn | <code>function</code> | Function to run for the test case |

<a name="EasySuite+run"></a>

### easySuite.run()
Execute test cases in the test suite

**Kind**: instance method of <code>[EasySuite](#EasySuite)</code>  
