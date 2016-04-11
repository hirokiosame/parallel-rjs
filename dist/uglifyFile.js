
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = uglifyFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uglifyFile(request) {
	var filePath = request.filePath;
	var config = request.config;

	// Log which file it's minifying

	console.log('Uglifying', filePath);

	// Minify
	try {
		_fs2.default.writeFileSync(filePath, _uglifyJs2.default.minify(filePath, config).code);
	} catch (e) {

		// Log error
		console.log('Error minifying:', filePath);
		console.log(e);

		// Exit with failure
		process.exit(1);
	} finally {
		process.exit(0);
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91Z2xpZnlGaWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTs7Ozs7a0JBS3dCOztBQUh4Qjs7OztBQUNBOzs7Ozs7QUFFZSxTQUFTLFVBQVQsQ0FBb0IsT0FBcEIsRUFBNkI7S0FFckMsV0FBcUIsUUFBckIsU0FGcUM7S0FFM0IsU0FBVyxRQUFYOzs7QUFGMkI7QUFLM0MsU0FBUSxHQUFSLENBQVksV0FBWixFQUF5QixRQUF6Qjs7O0FBTDJDLEtBUXZDO0FBQ0gsZUFBRyxhQUFILENBQWlCLFFBQWpCLEVBQTJCLG1CQUFTLE1BQVQsQ0FBZ0IsUUFBaEIsRUFBMEIsTUFBMUIsRUFBa0MsSUFBbEMsQ0FBM0IsQ0FERztFQUFKLENBSUEsT0FBTyxDQUFQLEVBQVU7OztBQUdULFVBQVEsR0FBUixDQUFZLGtCQUFaLEVBQWdDLFFBQWhDLEVBSFM7QUFJVCxVQUFRLEdBQVIsQ0FBWSxDQUFaOzs7QUFKUyxTQU9ULENBQVEsSUFBUixDQUFhLENBQWIsRUFQUztFQUFWLFNBVVE7QUFDUCxVQUFRLElBQVIsQ0FBYSxDQUFiLEVBRE87RUFkUjtDQVJjIiwiZmlsZSI6InVnbGlmeUZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB1Z2xpZnlqcyBmcm9tICd1Z2xpZnktanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1Z2xpZnlGaWxlKHJlcXVlc3QpIHtcblxuXHRsZXQgeyBmaWxlUGF0aCwgY29uZmlnIH0gPSByZXF1ZXN0O1xuXG5cdC8vIExvZyB3aGljaCBmaWxlIGl0J3MgbWluaWZ5aW5nXG5cdGNvbnNvbGUubG9nKCdVZ2xpZnlpbmcnLCBmaWxlUGF0aCk7XG5cblx0Ly8gTWluaWZ5XG5cdHRyeSB7XG5cdFx0ZnMud3JpdGVGaWxlU3luYyhmaWxlUGF0aCwgdWdsaWZ5anMubWluaWZ5KGZpbGVQYXRoLCBjb25maWcpLmNvZGUpO1xuXHR9XG5cblx0Y2F0Y2ggKGUpIHtcblxuXHRcdC8vIExvZyBlcnJvclxuXHRcdGNvbnNvbGUubG9nKCdFcnJvciBtaW5pZnlpbmc6JywgZmlsZVBhdGgpO1xuXHRcdGNvbnNvbGUubG9nKGUpO1xuXG5cdFx0Ly8gRXhpdCB3aXRoIGZhaWx1cmVcblx0XHRwcm9jZXNzLmV4aXQoMSk7XG5cdH1cblxuXHRmaW5hbGx5IHtcblx0XHRwcm9jZXNzLmV4aXQoMCk7XG5cdH1cbn07Il19