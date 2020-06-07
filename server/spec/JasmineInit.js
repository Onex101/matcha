var Jasmine = require('jasmine');
var jasmine = new Jasmine();

var myReporter = {
    jasmineStarted: function(suiteInfo) {
      console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
    },
  
    suiteStarted: function(result) {
      console.log('Suite started: ' + result.description
        + ' whose full description is: ' + result.fullName);
    },
  
    specStarted: async function(result) {
      await somethingAsync();
      console.log('Spec started: ' + result.description
        + ' whose full description is: ' + result.fullName);
    },
  
    specDone: function(result) {
      console.log('Spec: ' + result.description + ' was ' + result.status);
  
      for(var i = 0; i < result.failedExpectations.length; i++) {
        console.log('Failure: ' + result.failedExpectations[i].message);
        console.log(result.failedExpectations[i].stack);
      }
  
      console.log(result.passedExpectations.length);
    },
  
    suiteDone: function(result) {
      console.log('Suite: ' + result.description + ' was ' + result.status);
      for(var i = 0; i < result.failedExpectations.length; i++) {
        console.log('Suite ' + result.failedExpectations[i].message);
        console.log(result.failedExpectations[i].stack);
      }
    },
  
    jasmineDone: function(result) {
      console.log('Finished suite: ' + result.overallStatus);
      for(var i = 0; i < result.failedExpectations.length; i++) {
        console.log('Global ' + result.failedExpectations[i].message);
        console.log(result.failedExpectations[i].stack);
      }
    }
  };

var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

var reporter = new SpecReporter();

jasmine.addReporter(reporter);

jasmine.loadConfigFile('spec/support/jasmine.json');
// jasmine.getEnv().addReporter(myReporter);
// jasmine.addReporter(myReporter);

// jasmine.configureDefaultReporter({
//     timer: new jasmine.jasmine.Timer(),
//     // The `print` function passed the reporter will be called to print its results.
//     // `showColors` determines whether or not the reporter should use ANSI color codes.
//     showColors: true,
//     filter:"a spec name"
    
// });
jasmine.execute();