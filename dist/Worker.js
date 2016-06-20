'use strict';

require('source-map-support/register');

require('babel-polyfill');

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
		(0, _executeBuild2.default)(request.cwd, request.buildConfig);
	}

	if (request.task === 'uglify2') {
		(0, _log2.default)('Spawned uglifier');
		(0, _uglifyFile2.default)(request.config);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Xb3JrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7O0FBR0EsUUFBUSxFQUFSLENBQVcsU0FBWCxFQUFzQixVQUFTLE9BQVQsRUFBaUI7O0FBRXRDLEtBQUksUUFBUSxJQUFSLEtBQWlCLE9BQXJCLEVBQThCO0FBQzdCLHFCQUFJLHNCQUFKO0FBQ0EsOEJBQWEsUUFBUSxHQUFyQixFQUEwQixRQUFRLFdBQWxDO0FBQ0E7O0FBRUQsS0FBSSxRQUFRLElBQVIsS0FBaUIsU0FBckIsRUFBZ0M7QUFDL0IscUJBQUksa0JBQUo7QUFDQSw0QkFBVyxRQUFRLE1BQW5CO0FBQ0E7QUFDRCxDQVhEIiwiZmlsZSI6Ildvcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5cbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuaW1wb3J0IGV4ZWN1dGVCdWlsZCBmcm9tICcuL2V4ZWN1dGVCdWlsZCc7XG5pbXBvcnQgdWdsaWZ5RmlsZSBmcm9tICcuL3VnbGlmeUZpbGUnO1xuXG4vLyBGb3JrZWQgd29ya2VyOiBXYWl0IGZvciBtaW5pZmljYXRpb24gY29tbWFuZFxucHJvY2Vzcy5vbignbWVzc2FnZScsIGZ1bmN0aW9uKHJlcXVlc3Qpe1xuXG5cdGlmIChyZXF1ZXN0LnRhc2sgPT09ICdidWlsZCcpIHtcblx0XHRsb2coJ1NwYXduZWQgci5qcyBidWlsZGVyJyk7XG5cdFx0ZXhlY3V0ZUJ1aWxkKHJlcXVlc3QuY3dkLCByZXF1ZXN0LmJ1aWxkQ29uZmlnKTtcblx0fVxuXG5cdGlmIChyZXF1ZXN0LnRhc2sgPT09ICd1Z2xpZnkyJykge1xuXHRcdGxvZygnU3Bhd25lZCB1Z2xpZmllcicpO1xuXHRcdHVnbGlmeUZpbGUocmVxdWVzdC5jb25maWcpO1xuXHR9XG59KTtcbiJdfQ==