import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidenavToolbarAction } from 'src/app/shared/lib/components/sidenav-toolbar/sidenav-toolbar.interface';

@Component({
	selector: 'app-sidenav-toolbar',
	templateUrl: './sidenav-toolbar.component.html',
	styleUrls: ['./sidenav-toolbar.component.scss']
})
export class SidenavToolbarComponent {

	@Input() hideDivider = false;
	@Input() actions: SidenavToolbarAction[] = [];
	@Input() isLoading = false;
	@Input() tabIndex = -1;

	@Output() closeSidenav = new EventEmitter<boolean>();
	@Output() actionClick = new EventEmitter<string>();

	onClose(): void {
		this.closeSidenav.emit(true);
	}

	onAction(method: string | Function): void {
		if (typeof method === 'function') {
			method();
		} else {
			this.actionClick.emit(method);
		}
	}

}

