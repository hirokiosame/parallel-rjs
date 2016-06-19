
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
		(0, _executeBuild2.default)(request.cwd, request.config);
	}

	if (request.task === 'uglify2') {
		(0, _log2.default)('Spawned uglifier');
		(0, _uglifyFile2.default)(request.config);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Xb3JrZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7OztBQUdBLFFBQVEsRUFBUixDQUFXLFNBQVgsRUFBc0IsVUFBUyxPQUFULEVBQWlCOztBQUV0QyxLQUFJLFFBQVEsSUFBUixLQUFpQixPQUFyQixFQUE4QjtBQUM3QixxQkFBSSxzQkFBSjtBQUNBLDhCQUFhLFFBQVEsR0FBckIsRUFBMEIsUUFBUSxNQUFsQztBQUNBOztBQUVELEtBQUksUUFBUSxJQUFSLEtBQWlCLFNBQXJCLEVBQWdDO0FBQy9CLHFCQUFJLGtCQUFKO0FBQ0EsNEJBQVcsUUFBUSxNQUFuQjtBQUNBO0FBQ0QsQ0FYRCIsImZpbGUiOiJXb3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICdiYWJlbC1wb2x5ZmlsbCc7XG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5cbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuXG5pbXBvcnQgZXhlY3V0ZUJ1aWxkIGZyb20gJy4vZXhlY3V0ZUJ1aWxkJztcbmltcG9ydCB1Z2xpZnlGaWxlIGZyb20gJy4vdWdsaWZ5RmlsZSc7XG5cbi8vIEZvcmtlZCB3b3JrZXI6IFdhaXQgZm9yIG1pbmlmaWNhdGlvbiBjb21tYW5kXG5wcm9jZXNzLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24ocmVxdWVzdCl7XG5cblx0aWYgKHJlcXVlc3QudGFzayA9PT0gJ2J1aWxkJykge1xuXHRcdGxvZygnU3Bhd25lZCByLmpzIGJ1aWxkZXInKTtcblx0XHRleGVjdXRlQnVpbGQocmVxdWVzdC5jd2QsIHJlcXVlc3QuY29uZmlnKTtcblx0fVxuXG5cdGlmIChyZXF1ZXN0LnRhc2sgPT09ICd1Z2xpZnkyJykge1xuXHRcdGxvZygnU3Bhd25lZCB1Z2xpZmllcicpO1xuXHRcdHVnbGlmeUZpbGUocmVxdWVzdC5jb25maWcpO1xuXHR9XG59KTtcbiJdfQ==