import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
	name: 'safeStyle'
})
export class SafeStylePipe implements PipeTransform {

	constructor(private sanitizer: DomSanitizer) { }

	transform(value: string, args?: any): SafeStyle {
		return !value ||
			this.sanitizer.bypassSecurityTrustStyle(value);
	}
}
