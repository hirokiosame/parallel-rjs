
'use strict';

require('babel-polyfill');

require('source-map-support/register');

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

var _executeBuild = require('./executeBuild');

var _executeBuild2 = _interopRequireDefault(_executeBuild);

var _uglifyFile = require('./uglifyFile');

var _uglifyFile2 = _interopRequireDefault(_uglifyFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Forked worker: Wait for minification command
process.on('message', function (request) {

	if (request.task === 'build') {
		(0, _log2.default)('Spawned r.js builder');
		(0, _executeBuild2.default)(request.config);
	}

	if (request.task === 'uglify2') {
		(0, _log2.default)('Spawned uglifier');
		(0, _uglifyFile2.default)(request.config);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Xb3JrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7OztBQUdBLFFBQVEsRUFBUixDQUFXLFNBQVgsRUFBc0IsVUFBUyxPQUFULEVBQWlCOztBQUV0QyxLQUFJLFFBQVEsSUFBUixLQUFpQixPQUFyQixFQUE4QjtBQUM3QixxQkFBSSxzQkFBSjtBQUNBLDhCQUFhLFFBQVEsTUFBckI7QUFDQTs7QUFFRCxLQUFJLFFBQVEsSUFBUixLQUFpQixTQUFyQixFQUFnQztBQUMvQixxQkFBSSxrQkFBSjtBQUNBLDRCQUFXLFFBQVEsTUFBbkI7QUFDQTtBQUNELENBWEQiLCJmaWxlIjoiV29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuXG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuaW1wb3J0IGV4ZWN1dGVCdWlsZCBmcm9tICcuL2V4ZWN1dGVCdWlsZCc7XG5pbXBvcnQgdWdsaWZ5RmlsZSBmcm9tICcuL3VnbGlmeUZpbGUnO1xuXG4vLyBGb3JrZWQgd29ya2VyOiBXYWl0IGZvciBtaW5pZmljYXRpb24gY29tbWFuZFxucHJvY2Vzcy5vbignbWVzc2FnZScsIGZ1bmN0aW9uKHJlcXVlc3Qpe1xuXG5cdGlmIChyZXF1ZXN0LnRhc2sgPT09ICdidWlsZCcpIHtcblx0XHRsb2coJ1NwYXduZWQgci5qcyBidWlsZGVyJyk7XG5cdFx0ZXhlY3V0ZUJ1aWxkKHJlcXVlc3QuY29uZmlnKTtcblx0fVxuXG5cdGlmIChyZXF1ZXN0LnRhc2sgPT09ICd1Z2xpZnkyJykge1xuXHRcdGxvZygnU3Bhd25lZCB1Z2xpZmllcicpO1xuXHRcdHVnbGlmeUZpbGUocmVxdWVzdC5jb25maWcpO1xuXHR9XG59KTtcbiJdfQ==