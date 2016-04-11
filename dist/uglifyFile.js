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
		console.error('Error minifying:', filePath);
		console.error(e);

		// Exit with failure
		process.exit(1);
	} finally {
		process.exit(0);
	}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91Z2xpZnlGaWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztrQkFLd0I7O0FBSHhCOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVMsVUFBVCxDQUFvQixPQUFwQixFQUE2QjtLQUVyQyxXQUFxQixRQUFyQixTQUZxQztLQUUzQixTQUFXLFFBQVg7OztBQUYyQjtBQUszQyxTQUFRLEdBQVIsQ0FBWSxXQUFaLEVBQXlCLFFBQXpCOzs7QUFMMkMsS0FRdkM7QUFDSCxlQUFHLGFBQUgsQ0FBaUIsUUFBakIsRUFBMkIsbUJBQVMsTUFBVCxDQUFnQixRQUFoQixFQUEwQixNQUExQixFQUFrQyxJQUFsQyxDQUEzQixDQURHO0VBQUosQ0FJQSxPQUFPLENBQVAsRUFBVTs7O0FBR1QsVUFBUSxLQUFSLENBQWMsa0JBQWQsRUFBa0MsUUFBbEMsRUFIUztBQUlULFVBQVEsS0FBUixDQUFjLENBQWQ7OztBQUpTLFNBT1QsQ0FBUSxJQUFSLENBQWEsQ0FBYixFQVBTO0VBQVYsU0FVUTtBQUNQLFVBQVEsSUFBUixDQUFhLENBQWIsRUFETztFQWRSO0NBUmMiLCJmaWxlIjoidWdsaWZ5RmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB1Z2xpZnlqcyBmcm9tICd1Z2xpZnktanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1Z2xpZnlGaWxlKHJlcXVlc3QpIHtcblxuXHRsZXQgeyBmaWxlUGF0aCwgY29uZmlnIH0gPSByZXF1ZXN0O1xuXG5cdC8vIExvZyB3aGljaCBmaWxlIGl0J3MgbWluaWZ5aW5nXG5cdGNvbnNvbGUubG9nKCdVZ2xpZnlpbmcnLCBmaWxlUGF0aCk7XG5cblx0Ly8gTWluaWZ5XG5cdHRyeSB7XG5cdFx0ZnMud3JpdGVGaWxlU3luYyhmaWxlUGF0aCwgdWdsaWZ5anMubWluaWZ5KGZpbGVQYXRoLCBjb25maWcpLmNvZGUpO1xuXHR9XG5cblx0Y2F0Y2ggKGUpIHtcblxuXHRcdC8vIExvZyBlcnJvclxuXHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIG1pbmlmeWluZzonLCBmaWxlUGF0aCk7XG5cdFx0Y29uc29sZS5lcnJvcihlKTtcblxuXHRcdC8vIEV4aXQgd2l0aCBmYWlsdXJlXG5cdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHR9XG5cblx0ZmluYWxseSB7XG5cdFx0cHJvY2Vzcy5leGl0KDApO1xuXHR9XG59Il19