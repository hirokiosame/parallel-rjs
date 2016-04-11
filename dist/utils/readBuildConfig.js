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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZWFkQnVpbGRDb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQUt3Qjs7QUFIeEI7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBUyxlQUFULENBQXlCLGVBQXpCLEVBQTBDOztBQUV4RCxLQUFJLENBQUMsZUFBRCxFQUFrQjtBQUNyQixRQUFNLElBQUksS0FBSixDQUFVLDBDQUFWLENBQU4sQ0FEcUI7RUFBdEI7O0FBSUEsUUFBTyxLQUFLLGFBQUcsWUFBSCxDQUFnQixlQUFLLE9BQUwsQ0FBYSxRQUFRLEdBQVIsRUFBYixFQUE0QixlQUE1QixDQUFoQixFQUE4RCxRQUE5RCxFQUFMLENBQVAsQ0FOd0Q7Q0FBMUMiLCJmaWxlIjoicmVhZEJ1aWxkQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlYWRCdWlsZENvbmZpZyhidWlsZENvbmZpZ1BhdGgpIHtcblxuXHRpZiAoIWJ1aWxkQ29uZmlnUGF0aCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignYnVpbGQtY29uZmlnLmpzIGZvciByLmpzIG5vdCBzcGVjaWZpZmVkIScpO1xuXHR9XG5cblx0cmV0dXJuIGV2YWwoZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBidWlsZENvbmZpZ1BhdGgpKS50b1N0cmluZygpKTtcbn0iXX0=