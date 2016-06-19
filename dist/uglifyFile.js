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

	var startTime = new Date();

	// Minify
	try {
		_fs2.default.writeFileSync(filePath, _uglifyJs2.default.minify(filePath, config).code);
	} catch (e) {

		// Log error
		(0, _log2.default)('Error uglifying:', filePath, e);

		// Exit with failure
		process.exit(1);
	} finally {
		var elapsedTime = (new Date() - startTime) / 1000;
		(0, _log2.default)('Successfully uglified ' + filePath + ' in ' + elapsedTime + 's');
		process.exit(0);
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91Z2xpZnlGaWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztrQkFNd0IsVTs7QUFKeEI7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFZSxTQUFTLFVBQVQsQ0FBb0IsT0FBcEIsRUFBNkI7QUFBQSxLQUVyQyxRQUZxQyxHQUVoQixPQUZnQixDQUVyQyxRQUZxQztBQUFBLEtBRTNCLE1BRjJCLEdBRWhCLE9BRmdCLENBRTNCLE1BRjJCOzs7O0FBSzNDLG9CQUFJLFdBQUosRUFBaUIsUUFBakI7O0FBRUEsS0FBSSxZQUFZLElBQUksSUFBSixFQUFoQjs7O0FBR0EsS0FBSTtBQUNILGVBQUcsYUFBSCxDQUFpQixRQUFqQixFQUEyQixtQkFBUyxNQUFULENBQWdCLFFBQWhCLEVBQTBCLE1BQTFCLEVBQWtDLElBQTdEO0FBQ0EsRUFGRCxDQUlBLE9BQU8sQ0FBUCxFQUFVOzs7QUFHVCxxQkFBSSxrQkFBSixFQUF3QixRQUF4QixFQUFrQyxDQUFsQzs7O0FBR0EsVUFBUSxJQUFSLENBQWEsQ0FBYjtBQUNBLEVBWEQsU0FhUTtBQUNQLE1BQUksY0FBYyxDQUFFLElBQUksSUFBSixFQUFELEdBQWUsU0FBaEIsSUFBMkIsSUFBN0M7QUFDQSxnREFBNkIsUUFBN0IsWUFBNEMsV0FBNUM7QUFDQSxVQUFRLElBQVIsQ0FBYSxDQUFiO0FBQ0E7QUFDRCIsImZpbGUiOiJ1Z2xpZnlGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHVnbGlmeWpzIGZyb20gJ3VnbGlmeS1qcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdWdsaWZ5RmlsZShyZXF1ZXN0KSB7XG5cblx0bGV0IHsgZmlsZVBhdGgsIGNvbmZpZyB9ID0gcmVxdWVzdDtcblxuXHQvLyBMb2cgd2hpY2ggZmlsZSBpdCdzIG1pbmlmeWluZ1xuXHRsb2coJ1VnbGlmeWluZycsIGZpbGVQYXRoKTtcblxuXHRsZXQgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuXHQvLyBNaW5pZnlcblx0dHJ5IHtcblx0XHRmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCB1Z2xpZnlqcy5taW5pZnkoZmlsZVBhdGgsIGNvbmZpZykuY29kZSk7XG5cdH1cblxuXHRjYXRjaCAoZSkge1xuXG5cdFx0Ly8gTG9nIGVycm9yXG5cdFx0bG9nKCdFcnJvciB1Z2xpZnlpbmc6JywgZmlsZVBhdGgsIGUpO1xuXG5cdFx0Ly8gRXhpdCB3aXRoIGZhaWx1cmVcblx0XHRwcm9jZXNzLmV4aXQoMSk7XG5cdH1cblxuXHRmaW5hbGx5IHtcblx0XHRsZXQgZWxhcHNlZFRpbWUgPSAoKG5ldyBEYXRlKCkpIC0gc3RhcnRUaW1lKS8xMDAwO1xuXHRcdGxvZyhgU3VjY2Vzc2Z1bGx5IHVnbGlmaWVkICR7ZmlsZVBhdGh9IGluICR7ZWxhcHNlZFRpbWV9c2ApO1xuXHRcdHByb2Nlc3MuZXhpdCgwKTtcblx0fVxufSJdfQ==