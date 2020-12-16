import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
	selector: '[appScrolling]'
})
export class ScrollingDirective {

	@Output() scrolled = new EventEmitter<number>();

	@HostListener('scroll', ['$event'])
	onListenerTriggered(event: Event): void {
		this.scrolled.emit((event.target as any).scrollTop);
	}

}
