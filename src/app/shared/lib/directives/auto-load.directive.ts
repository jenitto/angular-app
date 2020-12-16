import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
	selector: '[appAutoload]'
})
export class AutoLoadDirective implements OnInit {

	@Input() autoloadCheckScroll$: Observable<any>;

	@Output() autoloadLoadMore = new EventEmitter<void>();

	constructor(
		private elementRef: ElementRef
	) { }

	ngOnInit() {
		this.autoloadCheckScroll$.subscribe(() => {
			setTimeout(() => {
				this.launchLoadMore();
			}, 0);
		});
	}

	private launchLoadMore() {
		if (!this.haveScroll()) {
			this.autoloadLoadMore.emit();
		}
	}

	private haveScroll(): boolean {
		return this.elementRef.nativeElement.scrollHeight > this.elementRef.nativeElement.offsetHeight;
	}

	@HostListener('window:resize')
	onListenerTriggered(): void {
		this.launchLoadMore();
	}

}
