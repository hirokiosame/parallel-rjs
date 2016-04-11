'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getModuleDeps;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var moduleAttrs = ['include', 'exclude', 'excludeShallow', 'insertRequire', 'override.deps'];

function getModuleDeps(module) {

	var deps = [];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = moduleAttrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var att = _step.value;


			var path = att.split('.'),
			    checkProp = module;

			while (path.length > 1) {
				checkProp = checkProp[path.shift()];
			}

			if (!checkProp || !(checkProp[path[0]] instanceof Array)) {
				continue;
			}

			deps.push.apply(deps, _toConsumableArray(checkProp[path[0]]));
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

	return deps;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZXRNb2R1bGVEZXBzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUl3Qjs7OztBQUZ4QixJQUFNLGNBQWMsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixnQkFBdkIsRUFBeUMsZUFBekMsRUFBMEQsZUFBMUQsQ0FBZDs7QUFFUyxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0I7O0FBRTdDLEtBQUksT0FBTyxFQUFQLENBRnlDOzs7Ozs7O0FBSTdDLHVCQUFnQixxQ0FBaEIsb0dBQTZCO09BQXBCLGtCQUFvQjs7O0FBRTVCLE9BQUksT0FBTyxJQUFJLEtBQUosQ0FBVSxHQUFWLENBQVA7T0FDSCxZQUFZLE1BQVosQ0FIMkI7O0FBSzVCLFVBQU8sS0FBSyxNQUFMLEdBQWMsQ0FBZCxFQUFpQjtBQUN2QixnQkFBWSxVQUFVLEtBQUssS0FBTCxFQUFWLENBQVosQ0FEdUI7SUFBeEI7O0FBSUEsT0FBSSxDQUFDLFNBQUQsSUFBYyxFQUFFLFVBQVUsS0FBSyxDQUFMLENBQVYsYUFBOEIsS0FBOUIsQ0FBRixFQUF3QztBQUFFLGFBQUY7SUFBMUQ7O0FBRUEsUUFBSyxJQUFMLGdDQUFhLFVBQVUsS0FBSyxDQUFMLENBQVYsRUFBYixFQVg0QjtHQUE3Qjs7Ozs7Ozs7Ozs7Ozs7RUFKNkM7O0FBa0I3QyxRQUFPLElBQVAsQ0FsQjZDO0NBQS9CIiwiZmlsZSI6ImdldE1vZHVsZURlcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY29uc3QgbW9kdWxlQXR0cnMgPSBbJ2luY2x1ZGUnLCAnZXhjbHVkZScsICdleGNsdWRlU2hhbGxvdycsICdpbnNlcnRSZXF1aXJlJywgJ292ZXJyaWRlLmRlcHMnXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TW9kdWxlRGVwcyhtb2R1bGUpIHtcblxuXHRsZXQgZGVwcyA9IFtdO1xuXG5cdGZvciAobGV0IGF0dCBvZiBtb2R1bGVBdHRycykge1xuXG5cdFx0bGV0IHBhdGggPSBhdHQuc3BsaXQoJy4nKSxcblx0XHRcdGNoZWNrUHJvcCA9IG1vZHVsZTtcblxuXHRcdHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdGNoZWNrUHJvcCA9IGNoZWNrUHJvcFtwYXRoLnNoaWZ0KCldO1xuXHRcdH1cblxuXHRcdGlmICghY2hlY2tQcm9wIHx8ICEoY2hlY2tQcm9wW3BhdGhbMF1dIGluc3RhbmNlb2YgQXJyYXkpKSB7IGNvbnRpbnVlOyB9XG5cblx0XHRkZXBzLnB1c2goLi4uY2hlY2tQcm9wW3BhdGhbMF1dKTtcblx0fVxuXG5cdHJldHVybiBkZXBzO1xufTsiXX0=