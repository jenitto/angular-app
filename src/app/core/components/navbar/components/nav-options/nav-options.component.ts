import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-nav-options',
	templateUrl: './nav-options.component.html',
	styleUrls: ['./nav-options.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NavOptionsComponent {

	@Output() openSearchSidenav = new EventEmitter<boolean>();
	@Output() openVersionDialog = new EventEmitter<void>();

}
