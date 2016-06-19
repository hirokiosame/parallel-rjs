'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = log;
function log() {
	var _console;

	var date = new Date(),
	    time = [date.getHours(), date.getMinutes(), date.getSeconds()].map(function (t) {
		return t < 10 ? '0' + t : t;
	}).join(':');

	var header = process.pid + ' @ ' + time + ' | ';

	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	(_console = console).log.apply(_console, [header].concat(args, ['\n']));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2tCQUV3QixHO0FBQVQsU0FBUyxHQUFULEdBQXFCO0FBQUE7O0FBQ25DLEtBQUksT0FBTyxJQUFJLElBQUosRUFBWDtBQUFBLEtBQ0MsT0FBTyxDQUFDLEtBQUssUUFBTCxFQUFELEVBQWtCLEtBQUssVUFBTCxFQUFsQixFQUFxQyxLQUFLLFVBQUwsRUFBckMsRUFDTCxHQURLLENBQ0Q7QUFBQSxTQUFLLElBQUksRUFBSixHQUFTLE1BQU0sQ0FBZixHQUFtQixDQUF4QjtBQUFBLEVBREMsRUFDMEIsSUFEMUIsQ0FDK0IsR0FEL0IsQ0FEUjs7QUFLQSxLQUFJLFNBQVksUUFBUSxHQUFwQixXQUE2QixJQUE3QixRQUFKOztBQU5tQyxtQ0FBTCxJQUFLO0FBQUwsTUFBSztBQUFBOztBQVFuQyxzQkFBUSxHQUFSLGtCQUFZLE1BQVosU0FBdUIsSUFBdkIsR0FBNkIsSUFBN0I7QUFDQSIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZyguLi5hcmdzKXtcblx0bGV0IGRhdGUgPSBuZXcgRGF0ZSgpLFxuXHRcdHRpbWUgPSBbZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSwgZGF0ZS5nZXRTZWNvbmRzKCldXG5cdFx0XHQubWFwKHQgPT4gdCA8IDEwID8gJzAnICsgdCA6IHQpLmpvaW4oJzonKTtcblxuXG5cdGxldCBoZWFkZXIgPSBgJHtwcm9jZXNzLnBpZH0gQCAke3RpbWV9IHwgYDtcblxuXHRjb25zb2xlLmxvZyhoZWFkZXIsIC4uLmFyZ3MsICdcXG4nKTtcbn1cbiJdfQ==