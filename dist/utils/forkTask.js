
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = forkTask;

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var workers = new Set();
var instances = 0;
function forkTask(request) {

	var worker = _child_process2.default.fork(__dirname + '/../Worker.js')

	// Exit with failure if fork fails minification
	.on('exit', function (exitCode) {

		// Propagate errors
		if (exitCode !== 0) {
			// console.log(arguments);
			process.exit(exitCode);
		}

		workers.delete(this);

		var completed = instances - workers.size;
		var percent = ~~(completed / instances * 100);

		(0, _log2.default)('Completed ' + completed + '/' + instances + ' (' + percent + '%) Remaining Workers: [' + Array.from(workers).map(function (w) {
			return w.pid;
		}) + ']\n');
	});

	instances++;

	workers.add(worker);

	worker.send(request);

	return worker;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9mb3JrVGFzay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7Ozs7O2tCQU93QixROztBQUx4Qjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFVBQVUsSUFBSSxHQUFKLEVBQWQ7QUFDQSxJQUFJLFlBQVksQ0FBaEI7QUFDZSxTQUFTLFFBQVQsQ0FBbUIsT0FBbkIsRUFBMkI7O0FBRXpDLEtBQUksU0FBUyx3QkFBYyxJQUFkLENBQW1CLFlBQVksZUFBL0I7OztBQUFBLEVBR1gsRUFIVyxDQUdSLE1BSFEsRUFHQSxVQUFTLFFBQVQsRUFBa0I7OztBQUc3QixNQUFJLGFBQWEsQ0FBakIsRUFBb0I7O0FBRW5CLFdBQVEsSUFBUixDQUFhLFFBQWI7QUFDQTs7QUFFRCxVQUFRLE1BQVIsQ0FBZSxJQUFmOztBQUVBLE1BQUksWUFBWSxZQUFZLFFBQVEsSUFBcEM7QUFDQSxNQUFJLFVBQVUsQ0FBQyxFQUFFLFlBQVUsU0FBVixHQUFzQixHQUF4QixDQUFmOztBQUVBLG9DQUFpQixTQUFqQixTQUE4QixTQUE5QixVQUE0QyxPQUE1QywrQkFBNkUsTUFBTSxJQUFOLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUF3QjtBQUFBLFVBQUssRUFBRSxHQUFQO0FBQUEsR0FBeEIsQ0FBN0U7QUFDQSxFQWpCVyxDQUFiOztBQW1CQTs7QUFFQSxTQUFRLEdBQVIsQ0FBWSxNQUFaOztBQUVBLFFBQU8sSUFBUCxDQUFZLE9BQVo7O0FBRUEsUUFBTyxNQUFQO0FBQ0EiLCJmaWxlIjoiZm9ya1Rhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nJztcblxubGV0IHdvcmtlcnMgPSBuZXcgU2V0KCk7XG5sZXQgaW5zdGFuY2VzID0gMDtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcmtUYXNrIChyZXF1ZXN0KXtcblxuXHRsZXQgd29ya2VyID0gY2hpbGRfcHJvY2Vzcy5mb3JrKF9fZGlybmFtZSArICcvLi4vV29ya2VyLmpzJylcblxuXHRcdC8vIEV4aXQgd2l0aCBmYWlsdXJlIGlmIGZvcmsgZmFpbHMgbWluaWZpY2F0aW9uXG5cdFx0Lm9uKCdleGl0JywgZnVuY3Rpb24oZXhpdENvZGUpe1xuXG5cdFx0XHQvLyBQcm9wYWdhdGUgZXJyb3JzXG5cdFx0XHRpZiAoZXhpdENvZGUgIT09IDApIHtcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coYXJndW1lbnRzKTtcblx0XHRcdFx0cHJvY2Vzcy5leGl0KGV4aXRDb2RlKTtcblx0XHRcdH1cblxuXHRcdFx0d29ya2Vycy5kZWxldGUodGhpcyk7XG5cblx0XHRcdGxldCBjb21wbGV0ZWQgPSBpbnN0YW5jZXMgLSB3b3JrZXJzLnNpemU7XG5cdFx0XHRsZXQgcGVyY2VudCA9IH5+KGNvbXBsZXRlZC9pbnN0YW5jZXMgKiAxMDApO1xuXG5cdFx0XHRsb2coYENvbXBsZXRlZCAke2NvbXBsZXRlZH0vJHtpbnN0YW5jZXN9ICgke3BlcmNlbnR9JSkgUmVtYWluaW5nIFdvcmtlcnM6IFske0FycmF5LmZyb20od29ya2VycykubWFwKHcgPT4gdy5waWQpfV1cXG5gKTtcblx0XHR9KTtcblxuXHRpbnN0YW5jZXMrKztcblxuXHR3b3JrZXJzLmFkZCh3b3JrZXIpO1xuXG5cdHdvcmtlci5zZW5kKHJlcXVlc3QpO1xuXG5cdHJldHVybiB3b3JrZXI7XG59OyJdfQ==