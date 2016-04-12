'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = uglifyFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uglifyFile(request) {
	var filePath = request.filePath;
	var config = request.config;

	// Log which file it's minifying

	(0, _log2.default)('Uglifying', filePath);

	// Minify
	try {
		_fs2.default.writeFileSync(filePath, _uglifyJs2.default.minify(filePath, config).code);
	} catch (e) {

		// Log error
		(0, _log2.default)('Error uglifying:', filePath, e);

		// Exit with failure
		process.exit(1);
	} finally {
		process.exit(0);
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91Z2xpZnlGaWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztrQkFNd0I7O0FBSnhCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBUyxVQUFULENBQW9CLE9BQXBCLEVBQTZCO0tBRXJDLFdBQXFCLFFBQXJCLFNBRnFDO0tBRTNCLFNBQVcsUUFBWDs7O0FBRjJCO0FBSzNDLG9CQUFJLFdBQUosRUFBaUIsUUFBakI7OztBQUwyQyxLQVF2QztBQUNILGVBQUcsYUFBSCxDQUFpQixRQUFqQixFQUEyQixtQkFBUyxNQUFULENBQWdCLFFBQWhCLEVBQTBCLE1BQTFCLEVBQWtDLElBQWxDLENBQTNCLENBREc7RUFBSixDQUlBLE9BQU8sQ0FBUCxFQUFVOzs7QUFHVCxxQkFBSSxrQkFBSixFQUF3QixRQUF4QixFQUFrQyxDQUFsQzs7O0FBSFMsU0FNVCxDQUFRLElBQVIsQ0FBYSxDQUFiLEVBTlM7RUFBVixTQVNRO0FBQ1AsVUFBUSxJQUFSLENBQWEsQ0FBYixFQURPO0VBYlI7Q0FSYyIsImZpbGUiOiJ1Z2xpZnlGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHVnbGlmeWpzIGZyb20gJ3VnbGlmeS1qcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdWdsaWZ5RmlsZShyZXF1ZXN0KSB7XG5cblx0bGV0IHsgZmlsZVBhdGgsIGNvbmZpZyB9ID0gcmVxdWVzdDtcblxuXHQvLyBMb2cgd2hpY2ggZmlsZSBpdCdzIG1pbmlmeWluZ1xuXHRsb2coJ1VnbGlmeWluZycsIGZpbGVQYXRoKTtcblxuXHQvLyBNaW5pZnlcblx0dHJ5IHtcblx0XHRmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCB1Z2xpZnlqcy5taW5pZnkoZmlsZVBhdGgsIGNvbmZpZykuY29kZSk7XG5cdH1cblxuXHRjYXRjaCAoZSkge1xuXG5cdFx0Ly8gTG9nIGVycm9yXG5cdFx0bG9nKCdFcnJvciB1Z2xpZnlpbmc6JywgZmlsZVBhdGgsIGUpO1xuXG5cdFx0Ly8gRXhpdCB3aXRoIGZhaWx1cmVcblx0XHRwcm9jZXNzLmV4aXQoMSk7XG5cdH1cblxuXHRmaW5hbGx5IHtcblx0XHRwcm9jZXNzLmV4aXQoMCk7XG5cdH1cbn0iXX0=