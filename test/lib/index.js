var Mocha = require('mocha'),
    chai = require("chai"),
    sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

var sinon = require('sinon');

sinon.config = {
  injectIntoThis: true,
  injectInto: null,
  properties: ['spy', 'stub', 'mock', 'clock', 'sandbox', 'server', 'requests', 'on'],
  useFakeTimers: [10],
  useFakeServer: true
};

var loadFiles = Mocha.prototype.loadFiles;
Mocha.prototype.loadFiles = function() {
  this.suite.beforeEach(function() {
    var config = sinon.getConfig(sinon.config);
    config.injectInto = this;
    this.sandbox = sinon.sandbox.create(config);
  });
  this.suite.afterEach(function() {
    this.clock.tick(1000);
    this.sandbox.verifyAndRestore();
  });

  return loadFiles.apply(this);
};
