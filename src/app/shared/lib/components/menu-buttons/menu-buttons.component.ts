import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuButton } from 'src/app/shared/lib/components/menu-buttons/menu-buttons.interface';

@Component({
	selector: 'app-menu-buttons',
	templateUrl: './menu-buttons.component.html',
	styleUrls: ['./menu-buttons.component.scss']
})
export class MenuButtonsComponent {

	@Input() menuButtons: MenuButton[] = [];
	@Input() disabled = false;
	@Input() size = '48px';
	@Input() color = '#666666';
	@Input() icon = 'menu';

	@Output() openMenu = new EventEmitter<void>();
	@Output() closeMenu = new EventEmitter<void>();

	checkIfDisabled(): boolean {
		return this.disabled
			|| !this.menuButtons
				.filter((button: MenuButton) => button.show)
				.filter((button: MenuButton) => !button.disabled).length;
	}

	onAction(method: Function): void {
		method();
	}

}
