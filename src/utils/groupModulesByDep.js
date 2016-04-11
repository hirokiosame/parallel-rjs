'use strict';

const moduleAttrs = ['include', 'exclude', 'excludeShallow', 'insertRequire', 'override.deps'];

function getModuleDeps(module) {

	let deps = [];

	for (let att of moduleAttrs) {

		let path = att.split('.'),
			checkProp = module;

		while (path.length > 1) {
			checkProp = checkProp[path.shift()];
		}

		if (!checkProp || !(checkProp[path[0]] instanceof Array)) { continue; }

		deps.push(...checkProp[path[0]]);
	}

	return deps;
}


export default function groupModulesByDep(modulesArr) {

	let moduleMap = {}, groupedModules = [];


	// Create map
	for (let module of modulesArr) {

		console.assert(!moduleMap[module.name], 'Duplicate module name');

		groupedModules.push(moduleMap[module.name] = new Set([module]));
	}

	for (let module of modulesArr) {

		let dependencies = getModuleDeps(module);

		for (let dep of dependencies) {
			if (!moduleMap[dep]) { continue; }

			moduleMap[dep].add(module);
		}
	}

	// Sort by largest
	groupedModules.sort( (a, b) => a.length - b.length);


	for (let i = 0; i < groupedModules.length; i++) {

		for (let j = groupedModules.length-1; j > i; j--) {

			let intersection = new Set([...groupedModules[i]].filter(x => groupedModules[j].has(x)));

			if (intersection.size > 0) {

				// Union
				for (let el of groupedModules[i]) {
					groupedModules[j].add(el);
				}
				groupedModules.splice(i, 1);
				i--;
			}
		}
	}

	return groupedModules.map(modules => Array.from(modules));
}
