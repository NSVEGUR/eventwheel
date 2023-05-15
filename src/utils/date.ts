function padTo2Digits(num: number) {
	return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
	return (
		[
			date.getFullYear(),
			padTo2Digits(date.getMonth() + 1),
			padTo2Digits(date.getDate())
		].join('-') +
		' ' +
		[
			padTo2Digits(date.getHours()),
			padTo2Digits(date.getMinutes())
		].join(':')
	);
}

function getTimeInAmPm(date: Date) {
	let hours = date.getHours();
	let minutes: string | number = date.getMinutes();
	let amPm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;
	return hours + ':' + minutes + ' ' + amPm;
}

export function formatDateWithAmPm(date: Date) {
	return (
		[
			date.getFullYear(),
			padTo2Digits(date.getMonth() + 1),
			padTo2Digits(date.getDate())
		].join('-') +
		' at ' +
		getTimeInAmPm(date)
	);
}
