'use strict';

require('source-map-support/register');

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _readBuildConfig = require('./utils/readBuildConfig');

var _readBuildConfig2 = _interopRequireDefault(_readBuildConfig);

var _groupModulesByDep = require('./utils/groupModulesByDep');

var _groupModulesByDep2 = _interopRequireDefault(_groupModulesByDep);

var _executeBuild = require('./executeBuild');

var _executeBuild2 = _interopRequireDefault(_executeBuild);

var _uglifyFile = require('./uglifyFile');

var _uglifyFile2 = _interopRequireDefault(_uglifyFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function forkTask(request) {

	var child = _cluster2.default.fork()

	// Exit with failure if fork fails minification
	.on('exit', function (exitCode) {

		// Propagate errors
		if (exitCode !== 0) {
			// console.log(arguments);
			process.exit(exitCode);
		}
	});

	child.send(request);

	return child;
}

// Forked worker: Wait for minification command
if (_cluster2.default.isWorker) {

	process.on('message', function (request) {

		if (request.task === 'build') {
			(0, _executeBuild2.default)(request.config);
		}

		if (request.task === 'uglify2') {
			(0, _uglifyFile2.default)(request.config);
		}
	});
}

// Master: Parse config and delegate tasks
if (_cluster2.default.isMaster) {

	// Read r.js config file
	var buildConfig = (0, _readBuildConfig2.default)(process.argv[2]);

	// Multiple outputs
	if (buildConfig.modules instanceof Array) {

		var moduleGroups = (0, _groupModulesByDep2.default)(buildConfig.modules /*.splice(0, 1)*/);

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = moduleGroups[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var moduleGroup = _step.value;


				buildConfig.modules = moduleGroup;

				// Spawn fork and send task
				// Note: Consider only spawning only the number CPU the computer has to reduce intensiveness
				forkTask({
					task: 'build',
					config: buildConfig
				})

				// Uglification request
				.on('message', function (config) {

					forkTask({
						task: 'uglify2',
						config: config
					});
				});
			}
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
	}

	// Output is a file
	else if (typeof buildConfig.out === 'string') {

			// console.log('1 file case');

		} else {
				throw new Error('Properties \'modules\' or \'out\' not defined in the config file');
			}
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFJQSxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMEI7O0FBRXpCLEtBQUksUUFBUSxrQkFBUSxJQUFSOzs7RUFHVixFQUhVLENBR1AsTUFITyxFQUdDLFVBQVMsUUFBVCxFQUFrQjs7O0FBRzdCLE1BQUksYUFBYSxDQUFiLEVBQWdCOztBQUVuQixXQUFRLElBQVIsQ0FBYSxRQUFiLEVBRm1CO0dBQXBCO0VBSFcsQ0FIVCxDQUZxQjs7QUFlekIsT0FBTSxJQUFOLENBQVcsT0FBWCxFQWZ5Qjs7QUFpQnpCLFFBQU8sS0FBUCxDQWpCeUI7Q0FBMUI7OztBQXFCQSxJQUFJLGtCQUFRLFFBQVIsRUFBa0I7O0FBRXJCLFNBQVEsRUFBUixDQUFXLFNBQVgsRUFBc0IsVUFBUyxPQUFULEVBQWlCOztBQUV0QyxNQUFJLFFBQVEsSUFBUixLQUFpQixPQUFqQixFQUEwQjtBQUM3QiwrQkFBYSxRQUFRLE1BQVIsQ0FBYixDQUQ2QjtHQUE5Qjs7QUFJQSxNQUFJLFFBQVEsSUFBUixLQUFpQixTQUFqQixFQUE0QjtBQUMvQiw2QkFBVyxRQUFRLE1BQVIsQ0FBWCxDQUQrQjtHQUFoQztFQU5xQixDQUF0QixDQUZxQjtDQUF0Qjs7O0FBZUEsSUFBSSxrQkFBUSxRQUFSLEVBQWtCOzs7QUFHckIsS0FBSSxjQUFjLCtCQUFnQixRQUFRLElBQVIsQ0FBYSxDQUFiLENBQWhCLENBQWQ7OztBQUhpQixLQU1qQixZQUFZLE9BQVosWUFBK0IsS0FBL0IsRUFBc0M7O0FBRXpDLE1BQUksZUFBZSxpQ0FBa0IsWUFBWSxPQUFaLGtCQUFsQixDQUFmLENBRnFDOzs7Ozs7O0FBSXpDLHdCQUF3QixzQ0FBeEIsb0dBQXNDO1FBQTdCLDBCQUE2Qjs7O0FBRXJDLGdCQUFZLE9BQVosR0FBc0IsV0FBdEI7Ozs7QUFGcUMsWUFNckMsQ0FBUztBQUNSLFdBQU0sT0FBTjtBQUNBLGFBQVEsV0FBUjtLQUZEOzs7S0FNQyxFQU5ELENBTUksU0FOSixFQU1lLFVBQVMsTUFBVCxFQUFnQjs7QUFFOUIsY0FBUztBQUNSLFlBQU0sU0FBTjtBQUNBLG9CQUZRO01BQVQsRUFGOEI7S0FBaEIsQ0FOZixDQU5xQztJQUF0Qzs7Ozs7Ozs7Ozs7Ozs7R0FKeUM7Ozs7QUFBMUMsTUEyQkssSUFBSSxPQUFPLFlBQVksR0FBWixLQUFvQixRQUEzQixFQUFxQzs7OztHQUF6QyxNQUlFO0FBQ04sVUFBTSxJQUFJLEtBQUosQ0FBVSxrRUFBVixDQUFOLENBRE07SUFKRjtDQWpDTiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuXG5pbXBvcnQgY2x1c3RlciBmcm9tICdjbHVzdGVyJztcblxuaW1wb3J0IHJlYWRCdWlsZENvbmZpZyBmcm9tICcuL3V0aWxzL3JlYWRCdWlsZENvbmZpZyc7XG5pbXBvcnQgZ3JvdXBNb2R1bGVzQnlEZXAgZnJvbSAnLi91dGlscy9ncm91cE1vZHVsZXNCeURlcCc7XG5cbmltcG9ydCBleGVjdXRlQnVpbGQgZnJvbSAnLi9leGVjdXRlQnVpbGQnO1xuaW1wb3J0IHVnbGlmeUZpbGUgZnJvbSAnLi91Z2xpZnlGaWxlJztcblxuXG5cbmZ1bmN0aW9uIGZvcmtUYXNrKHJlcXVlc3Qpe1xuXG5cdGxldCBjaGlsZCA9IGNsdXN0ZXIuZm9yaygpXG5cblx0XHQvLyBFeGl0IHdpdGggZmFpbHVyZSBpZiBmb3JrIGZhaWxzIG1pbmlmaWNhdGlvblxuXHRcdC5vbignZXhpdCcsIGZ1bmN0aW9uKGV4aXRDb2RlKXtcblxuXHRcdFx0Ly8gUHJvcGFnYXRlIGVycm9yc1xuXHRcdFx0aWYgKGV4aXRDb2RlICE9PSAwKSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XG5cdFx0XHRcdHByb2Nlc3MuZXhpdChleGl0Q29kZSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRjaGlsZC5zZW5kKHJlcXVlc3QpO1xuXG5cdHJldHVybiBjaGlsZDtcbn1cblxuLy8gRm9ya2VkIHdvcmtlcjogV2FpdCBmb3IgbWluaWZpY2F0aW9uIGNvbW1hbmRcbmlmIChjbHVzdGVyLmlzV29ya2VyKSB7XG5cblx0cHJvY2Vzcy5vbignbWVzc2FnZScsIGZ1bmN0aW9uKHJlcXVlc3Qpe1xuXG5cdFx0aWYgKHJlcXVlc3QudGFzayA9PT0gJ2J1aWxkJykge1xuXHRcdFx0ZXhlY3V0ZUJ1aWxkKHJlcXVlc3QuY29uZmlnKTtcblx0XHR9XG5cblx0XHRpZiAocmVxdWVzdC50YXNrID09PSAndWdsaWZ5MicpIHtcblx0XHRcdHVnbGlmeUZpbGUocmVxdWVzdC5jb25maWcpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8vIE1hc3RlcjogUGFyc2UgY29uZmlnIGFuZCBkZWxlZ2F0ZSB0YXNrc1xuaWYgKGNsdXN0ZXIuaXNNYXN0ZXIpIHtcblxuXHQvLyBSZWFkIHIuanMgY29uZmlnIGZpbGVcblx0bGV0XHRidWlsZENvbmZpZyA9IHJlYWRCdWlsZENvbmZpZyhwcm9jZXNzLmFyZ3ZbMl0pO1xuXG5cdC8vIE11bHRpcGxlIG91dHB1dHNcblx0aWYgKGJ1aWxkQ29uZmlnLm1vZHVsZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuXG5cdFx0bGV0IG1vZHVsZUdyb3VwcyA9IGdyb3VwTW9kdWxlc0J5RGVwKGJ1aWxkQ29uZmlnLm1vZHVsZXMvKi5zcGxpY2UoMCwgMSkqLyk7XG5cblx0XHRmb3IgKGxldCBtb2R1bGVHcm91cCBvZiBtb2R1bGVHcm91cHMpIHtcblxuXHRcdFx0YnVpbGRDb25maWcubW9kdWxlcyA9IG1vZHVsZUdyb3VwO1xuXG5cdFx0XHQvLyBTcGF3biBmb3JrIGFuZCBzZW5kIHRhc2tcblx0XHRcdC8vIE5vdGU6IENvbnNpZGVyIG9ubHkgc3Bhd25pbmcgb25seSB0aGUgbnVtYmVyIENQVSB0aGUgY29tcHV0ZXIgaGFzIHRvIHJlZHVjZSBpbnRlbnNpdmVuZXNzXG5cdFx0XHRmb3JrVGFzayh7XG5cdFx0XHRcdHRhc2s6ICdidWlsZCcsXG5cdFx0XHRcdGNvbmZpZzogYnVpbGRDb25maWdcblx0XHRcdH0pXG5cblx0XHRcdC8vIFVnbGlmaWNhdGlvbiByZXF1ZXN0XG5cdFx0XHQub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihjb25maWcpe1xuXG5cdFx0XHRcdGZvcmtUYXNrKHtcblx0XHRcdFx0XHR0YXNrOiAndWdsaWZ5MicsXG5cdFx0XHRcdFx0Y29uZmlnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gT3V0cHV0IGlzIGEgZmlsZVxuXHRlbHNlIGlmICh0eXBlb2YgYnVpbGRDb25maWcub3V0ID09PSAnc3RyaW5nJykge1xuXG5cdFx0Ly8gY29uc29sZS5sb2coJzEgZmlsZSBjYXNlJyk7XG5cblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Byb3BlcnRpZXMgXFwnbW9kdWxlc1xcJyBvciBcXCdvdXRcXCcgbm90IGRlZmluZWQgaW4gdGhlIGNvbmZpZyBmaWxlJyk7XG5cdH1cbn0iXX0=