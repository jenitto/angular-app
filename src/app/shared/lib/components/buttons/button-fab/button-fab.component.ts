import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-button-fab',
	templateUrl: './button-fab.component.html',
	styleUrls: ['./button-fab.component.scss']
})
export class ButtonFabComponent {
	@Output() buttonClick = new EventEmitter<void>();
}
