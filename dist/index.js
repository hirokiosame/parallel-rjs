'use strict';

require('babel-polyfill');

require('source-map-support/register');

var _yargs = require('yargs');

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

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

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
			(0, _log2.default)('Spawned r.js builder');
			(0, _executeBuild2.default)(request.config);
		}

		if (request.task === 'uglify2') {
			(0, _log2.default)('Spawned uglifier');
			(0, _uglifyFile2.default)(request.config);
		}
	});
}

// Master: Parse config and delegate tasks
if (_cluster2.default.isMaster) {

	// Read r.js config file
	var buildConfig = (0, _readBuildConfig2.default)(_yargs.argv._[0]);

	// Multiple outputs
	if (buildConfig.modules instanceof Array) {

		var moduleGroups = (0, _groupModulesByDep2.default)(buildConfig.modules);

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

					if (_yargs.argv.optimize === 'uglify2') {
						forkTask({
							task: 'uglify2',
							config: config
						});
					}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUdBLFNBQVMsUUFBVCxDQUFrQixPQUFsQixFQUEwQjs7QUFFekIsS0FBSSxRQUFRLGtCQUFRLElBQVI7OztFQUdWLEVBSFUsQ0FHUCxNQUhPLEVBR0MsVUFBUyxRQUFULEVBQWtCOzs7QUFHN0IsTUFBSSxhQUFhLENBQWIsRUFBZ0I7O0FBRW5CLFdBQVEsSUFBUixDQUFhLFFBQWIsRUFGbUI7R0FBcEI7RUFIVyxDQUhULENBRnFCOztBQWV6QixPQUFNLElBQU4sQ0FBVyxPQUFYLEVBZnlCOztBQWlCekIsUUFBTyxLQUFQLENBakJ5QjtDQUExQjs7O0FBcUJBLElBQUksa0JBQVEsUUFBUixFQUFrQjs7QUFFckIsU0FBUSxFQUFSLENBQVcsU0FBWCxFQUFzQixVQUFTLE9BQVQsRUFBaUI7O0FBRXRDLE1BQUksUUFBUSxJQUFSLEtBQWlCLE9BQWpCLEVBQTBCO0FBQzdCLHNCQUFJLHNCQUFKLEVBRDZCO0FBRTdCLCtCQUFhLFFBQVEsTUFBUixDQUFiLENBRjZCO0dBQTlCOztBQUtBLE1BQUksUUFBUSxJQUFSLEtBQWlCLFNBQWpCLEVBQTRCO0FBQy9CLHNCQUFJLGtCQUFKLEVBRCtCO0FBRS9CLDZCQUFXLFFBQVEsTUFBUixDQUFYLENBRitCO0dBQWhDO0VBUHFCLENBQXRCLENBRnFCO0NBQXRCOzs7QUFpQkEsSUFBSSxrQkFBUSxRQUFSLEVBQWtCOzs7QUFHckIsS0FBSSxjQUFjLCtCQUFnQixZQUFLLENBQUwsQ0FBTyxDQUFQLENBQWhCLENBQWQ7OztBQUhpQixLQU1qQixZQUFZLE9BQVosWUFBK0IsS0FBL0IsRUFBc0M7O0FBRXpDLE1BQUksZUFBZSxpQ0FBa0IsWUFBWSxPQUFaLENBQWpDLENBRnFDOzs7Ozs7O0FBSXpDLHdCQUF3QixzQ0FBeEIsb0dBQXNDO1FBQTdCLDBCQUE2Qjs7O0FBRXJDLGdCQUFZLE9BQVosR0FBc0IsV0FBdEI7Ozs7QUFGcUMsWUFNckMsQ0FBUztBQUNSLFdBQU0sT0FBTjtBQUNBLGFBQVEsV0FBUjtLQUZEOzs7S0FNQyxFQU5ELENBTUksU0FOSixFQU1lLFVBQVMsTUFBVCxFQUFnQjs7QUFFOUIsU0FBSSxZQUFLLFFBQUwsS0FBa0IsU0FBbEIsRUFBNkI7QUFDaEMsZUFBUztBQUNSLGFBQU0sU0FBTjtBQUNBLHFCQUZRO09BQVQsRUFEZ0M7TUFBakM7S0FGYyxDQU5mLENBTnFDO0lBQXRDOzs7Ozs7Ozs7Ozs7OztHQUp5Qzs7OztBQUExQyxNQTZCSyxJQUFJLE9BQU8sWUFBWSxHQUFaLEtBQW9CLFFBQTNCLEVBQXFDOzs7O0dBQXpDLE1BSUU7QUFDTixVQUFNLElBQUksS0FBSixDQUFVLGtFQUFWLENBQU4sQ0FETTtJQUpGO0NBbkNOIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcblxuaW1wb3J0IHsgYXJndiB9IGZyb20gJ3lhcmdzJztcblxuaW1wb3J0IGNsdXN0ZXIgZnJvbSAnY2x1c3Rlcic7XG5cbmltcG9ydCByZWFkQnVpbGRDb25maWcgZnJvbSAnLi91dGlscy9yZWFkQnVpbGRDb25maWcnO1xuaW1wb3J0IGdyb3VwTW9kdWxlc0J5RGVwIGZyb20gJy4vdXRpbHMvZ3JvdXBNb2R1bGVzQnlEZXAnO1xuXG5pbXBvcnQgZXhlY3V0ZUJ1aWxkIGZyb20gJy4vZXhlY3V0ZUJ1aWxkJztcbmltcG9ydCB1Z2xpZnlGaWxlIGZyb20gJy4vdWdsaWZ5RmlsZSc7XG5cbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuXG5cbmZ1bmN0aW9uIGZvcmtUYXNrKHJlcXVlc3Qpe1xuXG5cdGxldCBjaGlsZCA9IGNsdXN0ZXIuZm9yaygpXG5cblx0XHQvLyBFeGl0IHdpdGggZmFpbHVyZSBpZiBmb3JrIGZhaWxzIG1pbmlmaWNhdGlvblxuXHRcdC5vbignZXhpdCcsIGZ1bmN0aW9uKGV4aXRDb2RlKXtcblxuXHRcdFx0Ly8gUHJvcGFnYXRlIGVycm9yc1xuXHRcdFx0aWYgKGV4aXRDb2RlICE9PSAwKSB7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XG5cdFx0XHRcdHByb2Nlc3MuZXhpdChleGl0Q29kZSk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRjaGlsZC5zZW5kKHJlcXVlc3QpO1xuXG5cdHJldHVybiBjaGlsZDtcbn1cblxuLy8gRm9ya2VkIHdvcmtlcjogV2FpdCBmb3IgbWluaWZpY2F0aW9uIGNvbW1hbmRcbmlmIChjbHVzdGVyLmlzV29ya2VyKSB7XG5cblx0cHJvY2Vzcy5vbignbWVzc2FnZScsIGZ1bmN0aW9uKHJlcXVlc3Qpe1xuXG5cdFx0aWYgKHJlcXVlc3QudGFzayA9PT0gJ2J1aWxkJykge1xuXHRcdFx0bG9nKCdTcGF3bmVkIHIuanMgYnVpbGRlcicpO1xuXHRcdFx0ZXhlY3V0ZUJ1aWxkKHJlcXVlc3QuY29uZmlnKTtcblx0XHR9XG5cblx0XHRpZiAocmVxdWVzdC50YXNrID09PSAndWdsaWZ5MicpIHtcblx0XHRcdGxvZygnU3Bhd25lZCB1Z2xpZmllcicpO1xuXHRcdFx0dWdsaWZ5RmlsZShyZXF1ZXN0LmNvbmZpZyk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gTWFzdGVyOiBQYXJzZSBjb25maWcgYW5kIGRlbGVnYXRlIHRhc2tzXG5pZiAoY2x1c3Rlci5pc01hc3Rlcikge1xuXG5cdC8vIFJlYWQgci5qcyBjb25maWcgZmlsZVxuXHRsZXRcdGJ1aWxkQ29uZmlnID0gcmVhZEJ1aWxkQ29uZmlnKGFyZ3YuX1swXSk7XG5cblx0Ly8gTXVsdGlwbGUgb3V0cHV0c1xuXHRpZiAoYnVpbGRDb25maWcubW9kdWxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRsZXQgbW9kdWxlR3JvdXBzID0gZ3JvdXBNb2R1bGVzQnlEZXAoYnVpbGRDb25maWcubW9kdWxlcyk7XG5cblx0XHRmb3IgKGxldCBtb2R1bGVHcm91cCBvZiBtb2R1bGVHcm91cHMpIHtcblxuXHRcdFx0YnVpbGRDb25maWcubW9kdWxlcyA9IG1vZHVsZUdyb3VwO1xuXG5cdFx0XHQvLyBTcGF3biBmb3JrIGFuZCBzZW5kIHRhc2tcblx0XHRcdC8vIE5vdGU6IENvbnNpZGVyIG9ubHkgc3Bhd25pbmcgb25seSB0aGUgbnVtYmVyIENQVSB0aGUgY29tcHV0ZXIgaGFzIHRvIHJlZHVjZSBpbnRlbnNpdmVuZXNzXG5cdFx0XHRmb3JrVGFzayh7XG5cdFx0XHRcdHRhc2s6ICdidWlsZCcsXG5cdFx0XHRcdGNvbmZpZzogYnVpbGRDb25maWdcblx0XHRcdH0pXG5cblx0XHRcdC8vIFVnbGlmaWNhdGlvbiByZXF1ZXN0XG5cdFx0XHQub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihjb25maWcpe1xuXG5cdFx0XHRcdGlmIChhcmd2Lm9wdGltaXplID09PSAndWdsaWZ5MicpIHtcblx0XHRcdFx0XHRmb3JrVGFzayh7XG5cdFx0XHRcdFx0XHR0YXNrOiAndWdsaWZ5MicsXG5cdFx0XHRcdFx0XHRjb25maWdcblx0XHRcdFx0XHR9KTtcdFxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvLyBPdXRwdXQgaXMgYSBmaWxlXG5cdGVsc2UgaWYgKHR5cGVvZiBidWlsZENvbmZpZy5vdXQgPT09ICdzdHJpbmcnKSB7XG5cblx0XHQvLyBjb25zb2xlLmxvZygnMSBmaWxlIGNhc2UnKTtcblxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcignUHJvcGVydGllcyBcXCdtb2R1bGVzXFwnIG9yIFxcJ291dFxcJyBub3QgZGVmaW5lZCBpbiB0aGUgY29uZmlnIGZpbGUnKTtcblx0fVxufSJdfQ==