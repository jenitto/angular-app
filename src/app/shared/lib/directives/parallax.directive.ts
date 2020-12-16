import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[appParallax]'
})
export class ParallaxDirective implements OnChanges {
	@Input() parallaxRatio = 0.1;
	@Input() reverse = false;
	@Input() scrollableElement: ElementRef;

	private initialBackgroundPositionY = 50;

	constructor(
		private eleRef: ElementRef,
		private renderer: Renderer2
	) { }

	ngOnChanges(changes: SimpleChanges) {
		if (changes.scrollableElement && changes.scrollableElement.currentValue) {
			this.renderer.listen(changes.scrollableElement.currentValue, 'scroll', (evt) => {
				this.moveParallax(evt.srcElement.scrollTop);
			});
		}
	}

	private moveParallax(scrollTop: number) {
		let moveSCroll = scrollTop * this.parallaxRatio;
		moveSCroll = this.reverse ? -1 * moveSCroll : moveSCroll;
		this.renderer.setStyle(
			this.eleRef.nativeElement, 'background-position-y', (this.initialBackgroundPositionY + moveSCroll + '%'));
	}

}
