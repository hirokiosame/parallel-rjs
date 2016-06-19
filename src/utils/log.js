'use strict';

export default function log(...args){
	let date = new Date(),
		time = [date.getHours(), date.getMinutes(), date.getSeconds()]
			.map(t => t < 10 ? '0' + t : t).join(':');


	let header = `${process.pid} @ ${time} | `;

	console.log(header, ...args, '\n');
}
