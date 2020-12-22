import { Pipe, PipeTransform } from '@angular/core';

const colors: Array<string> = [
	'#41545D',
	'#279ED6',
	'#9B2761',
	'#E53B78',
	'#E7575B',
	'#5cce88',
	'#199AA8',
	'#EE9A37',
	'#B182A6',
	'#AAD355',
	'#1D5D93'
];

@Pipe({
	name: 'nameToColors'
})

export class NameToColorsPipe implements PipeTransform {
	transform(name: string): string {
		if (name) {
			const nameToNumber = name.replace(/\s/g, '').length;
			const ret: string = colors[nameToNumber % colors.length];
			return ret;
		}
	}
}