const assert = require('assert');
const { getBestPractices } = require('../agileBestPractices');

const practices = getBestPractices();
assert.ok(Array.isArray(practices), 'Best practices should be an array');
assert.ok(practices.length > 0, 'Best practices should not be empty');
console.log('All tests passed.');
