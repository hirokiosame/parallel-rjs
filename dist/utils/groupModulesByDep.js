'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = groupModulesByDep;

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
}

function groupModulesByDep(modulesArr) {

	var moduleMap = {},
	    groupedModules = [];

	// Create map
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = modulesArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var module = _step2.value;


			console.assert(!moduleMap[module.name], 'Duplicate module name');

			groupedModules.push(moduleMap[module.name] = new Set([module]));
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = modulesArr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var _module = _step3.value;


			var dependencies = getModuleDeps(_module);

			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = dependencies[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var dep = _step5.value;

					if (!moduleMap[dep]) {
						continue;
					}

					moduleMap[dep].add(_module);
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}
		}

		// Sort by largest
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	groupedModules.sort(function (a, b) {
		return a.length - b.length;
	});

	for (var i = 0; i < groupedModules.length; i++) {
		var _loop = function _loop(j) {

			var intersection = new Set([].concat(_toConsumableArray(groupedModules[i])).filter(function (x) {
				return groupedModules[j].has(x);
			}));

			if (intersection.size > 0) {

				// Union
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = groupedModules[i][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var el = _step4.value;

						groupedModules[j].add(el);
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				groupedModules.splice(i, 1);
				i--;
			}
		};

		for (var j = groupedModules.length - 1; j > i; j--) {
			_loop(j);
		}
	}

	return groupedModules.map(function (modules) {
		return Array.from(modules);
	});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ncm91cE1vZHVsZXNCeURlcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7a0JBMEJ3Qjs7OztBQXhCeEIsSUFBTSxjQUFjLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsZ0JBQXZCLEVBQXlDLGVBQXpDLEVBQTBELGVBQTFELENBQWQ7O0FBRU4sU0FBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCOztBQUU5QixLQUFJLE9BQU8sRUFBUCxDQUYwQjs7Ozs7OztBQUk5Qix1QkFBZ0IscUNBQWhCLG9HQUE2QjtPQUFwQixrQkFBb0I7OztBQUU1QixPQUFJLE9BQU8sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFQO09BQ0gsWUFBWSxNQUFaLENBSDJCOztBQUs1QixVQUFPLEtBQUssTUFBTCxHQUFjLENBQWQsRUFBaUI7QUFDdkIsZ0JBQVksVUFBVSxLQUFLLEtBQUwsRUFBVixDQUFaLENBRHVCO0lBQXhCOztBQUlBLE9BQUksQ0FBQyxTQUFELElBQWMsRUFBRSxVQUFVLEtBQUssQ0FBTCxDQUFWLGFBQThCLEtBQTlCLENBQUYsRUFBd0M7QUFBRSxhQUFGO0lBQTFEOztBQUVBLFFBQUssSUFBTCxnQ0FBYSxVQUFVLEtBQUssQ0FBTCxDQUFWLEVBQWIsRUFYNEI7R0FBN0I7Ozs7Ozs7Ozs7Ozs7O0VBSjhCOztBQWtCOUIsUUFBTyxJQUFQLENBbEI4QjtDQUEvQjs7QUFzQmUsU0FBUyxpQkFBVCxDQUEyQixVQUEzQixFQUF1Qzs7QUFFckQsS0FBSSxZQUFZLEVBQVo7S0FBZ0IsaUJBQWlCLEVBQWpCOzs7QUFGaUM7Ozs7O0FBTXJELHdCQUFtQixxQ0FBbkIsd0dBQStCO09BQXRCLHNCQUFzQjs7O0FBRTlCLFdBQVEsTUFBUixDQUFlLENBQUMsVUFBVSxPQUFPLElBQVAsQ0FBWCxFQUF5Qix1QkFBeEMsRUFGOEI7O0FBSTlCLGtCQUFlLElBQWYsQ0FBb0IsVUFBVSxPQUFPLElBQVAsQ0FBVixHQUF5QixJQUFJLEdBQUosQ0FBUSxDQUFDLE1BQUQsQ0FBUixDQUF6QixDQUFwQixDQUo4QjtHQUEvQjs7Ozs7Ozs7Ozs7Ozs7RUFOcUQ7Ozs7Ozs7QUFhckQsd0JBQW1CLHFDQUFuQix3R0FBK0I7T0FBdEIsdUJBQXNCOzs7QUFFOUIsT0FBSSxlQUFlLGNBQWMsT0FBZCxDQUFmLENBRjBCOzs7Ozs7O0FBSTlCLDBCQUFnQix1Q0FBaEIsd0dBQThCO1NBQXJCLG1CQUFxQjs7QUFDN0IsU0FBSSxDQUFDLFVBQVUsR0FBVixDQUFELEVBQWlCO0FBQUUsZUFBRjtNQUFyQjs7QUFFQSxlQUFVLEdBQVYsRUFBZSxHQUFmLENBQW1CLE9BQW5CLEVBSDZCO0tBQTlCOzs7Ozs7Ozs7Ozs7OztJQUo4QjtHQUEvQjs7Ozs7Ozs7Ozs7Ozs7OztFQWJxRDs7QUF5QnJELGdCQUFlLElBQWYsQ0FBcUIsVUFBQyxDQUFELEVBQUksQ0FBSjtTQUFVLEVBQUUsTUFBRixHQUFXLEVBQUUsTUFBRjtFQUFyQixDQUFyQixDQXpCcUQ7O0FBNEJyRCxNQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxlQUFlLE1BQWYsRUFBdUIsR0FBM0MsRUFBZ0Q7NkJBRXRDOztBQUVSLE9BQUksZUFBZSxJQUFJLEdBQUosQ0FBUSw2QkFBSSxlQUFlLENBQWYsR0FBSixDQUF1QixNQUF2QixDQUE4QjtXQUFLLGVBQWUsQ0FBZixFQUFrQixHQUFsQixDQUFzQixDQUF0QjtJQUFMLENBQXRDLENBQWY7O0FBRUosT0FBSSxhQUFhLElBQWIsR0FBb0IsQ0FBcEIsRUFBdUI7Ozs7Ozs7O0FBRzFCLDJCQUFlLGVBQWUsQ0FBZiw0QkFBZix3R0FBa0M7VUFBekIsa0JBQXlCOztBQUNqQyxxQkFBZSxDQUFmLEVBQWtCLEdBQWxCLENBQXNCLEVBQXRCLEVBRGlDO01BQWxDOzs7Ozs7Ozs7Ozs7OztLQUgwQjs7QUFNMUIsbUJBQWUsTUFBZixDQUFzQixDQUF0QixFQUF5QixDQUF6QixFQU4wQjtBQU8xQixRQVAwQjtJQUEzQjtJQU44Qzs7QUFFL0MsT0FBSyxJQUFJLElBQUksZUFBZSxNQUFmLEdBQXNCLENBQXRCLEVBQXlCLElBQUksQ0FBSixFQUFPLEdBQTdDLEVBQWtEO1NBQXpDLEdBQXlDO0dBQWxEO0VBRkQ7O0FBa0JBLFFBQU8sZUFBZSxHQUFmLENBQW1CO1NBQVcsTUFBTSxJQUFOLENBQVcsT0FBWDtFQUFYLENBQTFCLENBOUNxRDtDQUF2QyIsImZpbGUiOiJncm91cE1vZHVsZXNCeURlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbW9kdWxlQXR0cnMgPSBbJ2luY2x1ZGUnLCAnZXhjbHVkZScsICdleGNsdWRlU2hhbGxvdycsICdpbnNlcnRSZXF1aXJlJywgJ292ZXJyaWRlLmRlcHMnXTtcblxuZnVuY3Rpb24gZ2V0TW9kdWxlRGVwcyhtb2R1bGUpIHtcblxuXHRsZXQgZGVwcyA9IFtdO1xuXG5cdGZvciAobGV0IGF0dCBvZiBtb2R1bGVBdHRycykge1xuXG5cdFx0bGV0IHBhdGggPSBhdHQuc3BsaXQoJy4nKSxcblx0XHRcdGNoZWNrUHJvcCA9IG1vZHVsZTtcblxuXHRcdHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdGNoZWNrUHJvcCA9IGNoZWNrUHJvcFtwYXRoLnNoaWZ0KCldO1xuXHRcdH1cblxuXHRcdGlmICghY2hlY2tQcm9wIHx8ICEoY2hlY2tQcm9wW3BhdGhbMF1dIGluc3RhbmNlb2YgQXJyYXkpKSB7IGNvbnRpbnVlOyB9XG5cblx0XHRkZXBzLnB1c2goLi4uY2hlY2tQcm9wW3BhdGhbMF1dKTtcblx0fVxuXG5cdHJldHVybiBkZXBzO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdyb3VwTW9kdWxlc0J5RGVwKG1vZHVsZXNBcnIpIHtcblxuXHRsZXQgbW9kdWxlTWFwID0ge30sIGdyb3VwZWRNb2R1bGVzID0gW107XG5cblxuXHQvLyBDcmVhdGUgbWFwXG5cdGZvciAobGV0IG1vZHVsZSBvZiBtb2R1bGVzQXJyKSB7XG5cblx0XHRjb25zb2xlLmFzc2VydCghbW9kdWxlTWFwW21vZHVsZS5uYW1lXSwgJ0R1cGxpY2F0ZSBtb2R1bGUgbmFtZScpO1xuXG5cdFx0Z3JvdXBlZE1vZHVsZXMucHVzaChtb2R1bGVNYXBbbW9kdWxlLm5hbWVdID0gbmV3IFNldChbbW9kdWxlXSkpO1xuXHR9XG5cblx0Zm9yIChsZXQgbW9kdWxlIG9mIG1vZHVsZXNBcnIpIHtcblxuXHRcdGxldCBkZXBlbmRlbmNpZXMgPSBnZXRNb2R1bGVEZXBzKG1vZHVsZSk7XG5cblx0XHRmb3IgKGxldCBkZXAgb2YgZGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRpZiAoIW1vZHVsZU1hcFtkZXBdKSB7IGNvbnRpbnVlOyB9XG5cblx0XHRcdG1vZHVsZU1hcFtkZXBdLmFkZChtb2R1bGUpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFNvcnQgYnkgbGFyZ2VzdFxuXHRncm91cGVkTW9kdWxlcy5zb3J0KCAoYSwgYikgPT4gYS5sZW5ndGggLSBiLmxlbmd0aCk7XG5cblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRmb3IgKGxldCBqID0gZ3JvdXBlZE1vZHVsZXMubGVuZ3RoLTE7IGogPiBpOyBqLS0pIHtcblxuXHRcdFx0bGV0IGludGVyc2VjdGlvbiA9IG5ldyBTZXQoWy4uLmdyb3VwZWRNb2R1bGVzW2ldXS5maWx0ZXIoeCA9PiBncm91cGVkTW9kdWxlc1tqXS5oYXMoeCkpKTtcblxuXHRcdFx0aWYgKGludGVyc2VjdGlvbi5zaXplID4gMCkge1xuXG5cdFx0XHRcdC8vIFVuaW9uXG5cdFx0XHRcdGZvciAobGV0IGVsIG9mIGdyb3VwZWRNb2R1bGVzW2ldKSB7XG5cdFx0XHRcdFx0Z3JvdXBlZE1vZHVsZXNbal0uYWRkKGVsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRncm91cGVkTW9kdWxlcy5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdGktLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZ3JvdXBlZE1vZHVsZXMubWFwKG1vZHVsZXMgPT4gQXJyYXkuZnJvbShtb2R1bGVzKSk7XG59XG4iXX0=