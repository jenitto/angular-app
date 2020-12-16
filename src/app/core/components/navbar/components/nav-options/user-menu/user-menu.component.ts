import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

	@Output() openVersionDialog = new EventEmitter<void>();

}
