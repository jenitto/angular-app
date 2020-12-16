import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

	transform(myStr: string): string {
		let abbreviation = myStr.split(' ')
			.filter(n => n.length > 2)
			.slice(0, 2)
			.map(n => n.charAt(0).toUpperCase())
			.join('');
		if (!abbreviation.length) {
			abbreviation = myStr.charAt(0).toUpperCase();
		}
		return abbreviation;
	}
}
