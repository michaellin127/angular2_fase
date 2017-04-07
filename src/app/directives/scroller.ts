import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[scroller]' })
export class ScrollerDirective {
	@Input()
		bottom: string;
	@Output()
		scrollEvent:EventEmitter<string> = new EventEmitter();
	private nElement: ElementRef;

	constructor(el: ElementRef) {
		this.nElement = el.nativeElement;
	}

	@HostListener('scroll', ['$event'])
	ScrollEvent(event) {
		let targetElement = event.target;
		if (targetElement.scrollHeight > targetElement.offsetHeight) {
			if ((targetElement.scrollTop + targetElement.offsetHeight) > (targetElement.scrollHeight - parseFloat(this.bottom))) {
				this.scrollEvent.emit();
			}
		}
	}
}