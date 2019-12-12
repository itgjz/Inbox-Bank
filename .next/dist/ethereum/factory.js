'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require('./build/CampaignFactory.json');

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = new _web2.default.eth.Contract(JSON.parse(_CampaignFactory2.default.interface), '0xB7709f0bC7a9Ef27d37DC289b5d7b2249b8089F5'); //instance from web3.js
exports.default = instance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtXFxmYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndlYjMiLCJDYW1wYWlnbkZhY3RvcnkiLCJpbnN0YW5jZSIsImV0aCIsIkNvbnRyYWN0IiwiSlNPTiIsInBhcnNlIiwiaW50ZXJmYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXFCOzs7Ozs7QUFFNUIsSUFBTSxXQUFXLElBQUksY0FBQSxBQUFLLElBQVQsQUFBYSxTQUM1QixLQUFBLEFBQUssTUFBTSwwQkFESSxBQUNmLEFBQTJCLFlBRDdCLEFBQWlCLEFBRWYsQUFHRiwrQ0FSMkI7a0JBUTNCLEFBQWUiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJDOi94YW1wcC9odGRvY3MvQmFjaGVsb3IyMDE5L25vZGUtYm9pbGVycGxhdGVzL3NvY2lhbC1tZWRpYSJ9