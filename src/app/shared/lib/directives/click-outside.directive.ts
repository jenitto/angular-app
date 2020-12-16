import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
	selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

	@Input() refElements: ElementRef[];

	@Output() clickOutside = new EventEmitter<HTMLElement>();

	constructor(
		private elementRef: ElementRef
	) { }

	private hasBeenClickedOutside(container: HTMLElement, target: HTMLElement) {
		if (this.refElements && this.refElements.length) {
			const clickedOutside = this.refElements
				.map((elem: ElementRef) => {
					return !elem.nativeElement.contains(target);
				})
				.reduce((prev: boolean, curr: boolean) => prev && curr);
			return clickedOutside && !container.contains(target);
		} else {
			return !container.contains(target);
		}
	}

	@HostListener('document:click', ['$event.target'])
	onClick(targetElement: HTMLElement) {
		const clickedOutside = this.hasBeenClickedOutside(
			this.elementRef.nativeElement,
			targetElement
		);

		if (clickedOutside) {
			this.clickOutside.emit(targetElement);
		}
	}

}
