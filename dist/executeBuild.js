
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = executeBuild;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _requirejs = require('requirejs');

var _requirejs2 = _interopRequireDefault(_requirejs);

var _mkdirP = require('./utils/mkdirP');

var _mkdirP2 = _interopRequireDefault(_mkdirP);

var _child_process = require('child_process');

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TMPDIR = process.env.TMPDIR;

function executeBuild(buildConfig) {

	var buildID = (~ ~(Math.random() * 1000000000)).toString(36);

	// Not really unique... optimize later
	var buildDir = buildConfig.dir,
	    tempBuildDir = buildConfig.dir = _path2.default.join(TMPDIR, 'rjsBuild' + buildID);

	// if(buildConfig.modules.filter(m => m.name.match(/^site/)).length === 0) {
	// 	process.exit(0);
	// }

	// Make output directories
	buildConfig.modules.forEach(function (module) {
		return (0, _mkdirP2.default)(buildDir, module.name);
	});

	var optimize = buildConfig.optimize;
	buildConfig.optimize = 'none';

	// console.log(buildDir, tempBuildDir);
	// console.log(util.inspect(buildConfig, {depth: null, colors: true}));
	// console.log('\n\n');

	_requirejs2.default.optimize(buildConfig, function () {

		// Move built modules to right destination
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = buildConfig.modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var module = _step.value;


				var buildPath = _path2.default.join(tempBuildDir, module.name + '.js');
				var destPath = _path2.default.join(buildDir, module.name + '.js');

				// Move to real output dir
				_fs2.default.renameSync(buildPath, destPath);

				if (optimize === 'uglify2') {
					process.send({
						filePath: destPath,
						config: buildConfig.uglify2
					});
				}
			}

			// Delete build directory (fs.rmdirSync complains about deleteing a directory with content)
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		(0, _child_process.exec)('rm -rf ' + tempBuildDir, function (err) {
			if (err) {
				console.log(err);
			}
			process.exit(0);
		});
	}, function (err) {
		throw err;
	});
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leGVjdXRlQnVpbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBOzs7OztrQkFZd0I7O0FBVnhCOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUdBLElBQU0sU0FBUyxRQUFRLEdBQVIsQ0FBWSxNQUFaOztBQUVBLFNBQVMsWUFBVCxDQUFzQixXQUF0QixFQUFrQzs7QUFFaEQsS0FBTSxVQUFVLENBQUMsRUFBQyxFQUFFLEtBQUssTUFBTCxLQUFnQixVQUFoQixDQUFGLENBQUYsQ0FBaUMsUUFBakMsQ0FBMEMsRUFBMUMsQ0FBVjs7O0FBRjBDLEtBSzFDLFdBQVcsWUFBWSxHQUFaO0tBQ2YsZUFBZSxZQUFZLEdBQVosR0FBa0IsZUFBSyxJQUFMLENBQVUsTUFBVixFQUFrQixhQUFhLE9BQWIsQ0FBcEM7Ozs7Ozs7QUFOK0IsWUFlaEQsQ0FBWSxPQUFaLENBQW9CLE9BQXBCLENBQTRCO1NBQVUsc0JBQU8sUUFBUCxFQUFpQixPQUFPLElBQVA7RUFBM0IsQ0FBNUIsQ0FmZ0Q7O0FBaUJoRCxLQUFJLFdBQVcsWUFBWSxRQUFaLENBakJpQztBQWtCaEQsYUFBWSxRQUFaLEdBQXVCLE1BQXZCOzs7Ozs7QUFsQmdELG9CQXdCaEQsQ0FBVSxRQUFWLENBQ0MsV0FERCxFQUdDLFlBQVc7Ozs7Ozs7O0FBR1Ysd0JBQW1CLFlBQVksT0FBWiwwQkFBbkIsb0dBQXdDO1FBQS9CLHFCQUErQjs7O0FBRXZDLFFBQUksWUFBWSxlQUFLLElBQUwsQ0FBVSxZQUFWLEVBQXdCLE9BQU8sSUFBUCxHQUFjLEtBQWQsQ0FBcEMsQ0FGbUM7QUFHdkMsUUFBSSxXQUFXLGVBQUssSUFBTCxDQUFVLFFBQVYsRUFBb0IsT0FBTyxJQUFQLEdBQWMsS0FBZCxDQUEvQjs7O0FBSG1DLGdCQU12QyxDQUFHLFVBQUgsQ0FBYyxTQUFkLEVBQXlCLFFBQXpCLEVBTnVDOztBQVF2QyxRQUFJLGFBQWEsU0FBYixFQUF3QjtBQUMzQixhQUFRLElBQVIsQ0FBYTtBQUNaLGdCQUFVLFFBQVY7QUFDQSxjQUFRLFlBQVksT0FBWjtNQUZULEVBRDJCO0tBQTVCO0lBUkQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FIVTs7QUFvQlYsMkJBQUssWUFBWSxZQUFaLEVBQTBCLFVBQVMsR0FBVCxFQUFhO0FBQzNDLE9BQUksR0FBSixFQUFTO0FBQ1IsWUFBUSxHQUFSLENBQVksR0FBWixFQURRO0lBQVQ7QUFHQSxXQUFRLElBQVIsQ0FBYSxDQUFiLEVBSjJDO0dBQWIsQ0FBL0IsQ0FwQlU7RUFBWCxFQTZCQyxlQUFPO0FBQUUsUUFBTSxHQUFOLENBQUY7RUFBUCxDQWhDRixDQXhCZ0Q7Q0FBbEMiLCJmaWxlIjoiZXhlY3V0ZUJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCByZXF1aXJlanMgZnJvbSAncmVxdWlyZWpzJztcbmltcG9ydCBta2RpclAgZnJvbSAnLi91dGlscy9ta2RpclAnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XG5cblxuY29uc3QgVE1QRElSID0gcHJvY2Vzcy5lbnYuVE1QRElSO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleGVjdXRlQnVpbGQoYnVpbGRDb25maWcpe1xuXG5cdGNvbnN0XHRidWlsZElEID0gKH5+KE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwKSkudG9TdHJpbmcoMzYpO1xuXG5cdC8vIE5vdCByZWFsbHkgdW5pcXVlLi4uIG9wdGltaXplIGxhdGVyXG5cdGNvbnN0XHRidWlsZERpciA9IGJ1aWxkQ29uZmlnLmRpcixcblx0XHRcdHRlbXBCdWlsZERpciA9IGJ1aWxkQ29uZmlnLmRpciA9IHBhdGguam9pbihUTVBESVIsICdyanNCdWlsZCcgKyBidWlsZElEKTtcblxuXHQvLyBpZihidWlsZENvbmZpZy5tb2R1bGVzLmZpbHRlcihtID0+IG0ubmFtZS5tYXRjaCgvXnNpdGUvKSkubGVuZ3RoID09PSAwKSB7XG5cdC8vIFx0cHJvY2Vzcy5leGl0KDApO1xuXHQvLyB9XG5cblxuXG5cdC8vIE1ha2Ugb3V0cHV0IGRpcmVjdG9yaWVzXG5cdGJ1aWxkQ29uZmlnLm1vZHVsZXMuZm9yRWFjaChtb2R1bGUgPT4gbWtkaXJQKGJ1aWxkRGlyLCBtb2R1bGUubmFtZSkpO1xuXG5cdGxldCBvcHRpbWl6ZSA9IGJ1aWxkQ29uZmlnLm9wdGltaXplO1xuXHRidWlsZENvbmZpZy5vcHRpbWl6ZSA9ICdub25lJztcblxuXHQvLyBjb25zb2xlLmxvZyhidWlsZERpciwgdGVtcEJ1aWxkRGlyKTtcblx0Ly8gY29uc29sZS5sb2codXRpbC5pbnNwZWN0KGJ1aWxkQ29uZmlnLCB7ZGVwdGg6IG51bGwsIGNvbG9yczogdHJ1ZX0pKTtcblx0Ly8gY29uc29sZS5sb2coJ1xcblxcbicpO1xuXG5cdHJlcXVpcmVqcy5vcHRpbWl6ZShcblx0XHRidWlsZENvbmZpZyxcblxuXHRcdGZ1bmN0aW9uICgpe1xuXG5cdFx0XHQvLyBNb3ZlIGJ1aWx0IG1vZHVsZXMgdG8gcmlnaHQgZGVzdGluYXRpb25cblx0XHRcdGZvciAobGV0IG1vZHVsZSBvZiBidWlsZENvbmZpZy5tb2R1bGVzKSB7XG5cblx0XHRcdFx0bGV0IGJ1aWxkUGF0aCA9IHBhdGguam9pbih0ZW1wQnVpbGREaXIsIG1vZHVsZS5uYW1lICsgJy5qcycpO1xuXHRcdFx0XHRsZXQgZGVzdFBhdGggPSBwYXRoLmpvaW4oYnVpbGREaXIsIG1vZHVsZS5uYW1lICsgJy5qcycpO1xuXG5cdFx0XHRcdC8vIE1vdmUgdG8gcmVhbCBvdXRwdXQgZGlyXG5cdFx0XHRcdGZzLnJlbmFtZVN5bmMoYnVpbGRQYXRoLCBkZXN0UGF0aCk7XG5cblx0XHRcdFx0aWYgKG9wdGltaXplID09PSAndWdsaWZ5MicpIHtcblx0XHRcdFx0XHRwcm9jZXNzLnNlbmQoe1xuXHRcdFx0XHRcdFx0ZmlsZVBhdGg6IGRlc3RQYXRoLFxuXHRcdFx0XHRcdFx0Y29uZmlnOiBidWlsZENvbmZpZy51Z2xpZnkyXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gRGVsZXRlIGJ1aWxkIGRpcmVjdG9yeSAoZnMucm1kaXJTeW5jIGNvbXBsYWlucyBhYm91dCBkZWxldGVpbmcgYSBkaXJlY3Rvcnkgd2l0aCBjb250ZW50KVxuXHRcdFx0ZXhlYygncm0gLXJmICcgKyB0ZW1wQnVpbGREaXIsIGZ1bmN0aW9uKGVycil7XG5cdFx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHByb2Nlc3MuZXhpdCgwKTtcblx0XHRcdH0pO1xuXG5cdFx0fSxcblxuXHRcdChlcnIgPT4geyB0aHJvdyBlcnI7IH0pXG5cdCk7XG59OyJdfQ==