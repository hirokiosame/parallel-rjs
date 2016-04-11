
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = readBuildConfig;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readBuildConfig(buildConfigPath) {

	if (!buildConfigPath) {
		throw new Error('build-config.js for r.js not specififed!');
	}

	return eval(_fs2.default.readFileSync(_path2.default.resolve(process.cwd(), buildConfigPath)).toString());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZWFkQnVpbGRDb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7OztrQkFLd0I7O0FBSHhCOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVMsZUFBVCxDQUF5QixlQUF6QixFQUEwQzs7QUFFeEQsS0FBSSxDQUFDLGVBQUQsRUFBa0I7QUFDckIsUUFBTSxJQUFJLEtBQUosQ0FBVSwwQ0FBVixDQUFOLENBRHFCO0VBQXRCOztBQUlBLFFBQU8sS0FBSyxhQUFHLFlBQUgsQ0FBZ0IsZUFBSyxPQUFMLENBQWEsUUFBUSxHQUFSLEVBQWIsRUFBNEIsZUFBNUIsQ0FBaEIsRUFBOEQsUUFBOUQsRUFBTCxDQUFQLENBTndEO0NBQTFDIiwiZmlsZSI6InJlYWRCdWlsZENvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlYWRCdWlsZENvbmZpZyhidWlsZENvbmZpZ1BhdGgpIHtcblxuXHRpZiAoIWJ1aWxkQ29uZmlnUGF0aCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignYnVpbGQtY29uZmlnLmpzIGZvciByLmpzIG5vdCBzcGVjaWZpZmVkIScpO1xuXHR9XG5cblx0cmV0dXJuIGV2YWwoZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBidWlsZENvbmZpZ1BhdGgpKS50b1N0cmluZygpKTtcbn0iXX0=