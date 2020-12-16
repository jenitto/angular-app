import { Pipe, PipeTransform } from '@angular/core';

/*
 * Split translation using $¥ as token for no translatable elements,
 * for example, Urls: some text $¥url text$¥ some text
 * Takes an index as argument.
 * Usage:
 *   value | translateCut:index
 * Example:
 *  <p>
 *   {{ 'page.registration' | translate | translateCut:0 }}
 *   <a (click)="go()">{{ 'page.registration' | translate | translateCut:1 }}</a>
 *   {{ 'page.registration' | translate | translateCut:2 }}
 *  </p>>
*/
@Pipe({
	name: 'translateCut'
})
export class TranslateCutPipe implements PipeTransform {
	transform(value: any, index: number): any {
		const cutIndex = Number(index);
		return value.split('$¥')[cutIndex];
	}
}
