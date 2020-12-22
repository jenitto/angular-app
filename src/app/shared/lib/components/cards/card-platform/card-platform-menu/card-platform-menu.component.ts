import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuButton } from 'src/app/shared/lib/components/menu-buttons/menu-buttons.interface';
import { Platform } from 'src/app/shared/lib/interfaces/rawg/platform.interface';

@Component({
	selector: 'app-card-platform-menu',
	templateUrl: './card-platform-menu.component.html',
	styleUrls: ['./card-platform-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPlatformMenuComponent implements OnInit {

	@Input() disabled = false;
	@Input() platform: Platform;
	@Input() size = '48px';
	@Input() color = '#666666';
	@Input() icon = 'menu';

	@Output() editPlatform = new EventEmitter<void>();
	@Output() deletePlatform = new EventEmitter<void>();

	platformMenuButtons: MenuButton[] = [];

	constructor(
		private translate: TranslateService
	) { }

	ngOnInit(): void {
		this.updateMenuButtons();
	}

	updateMenuButtons(): void {
		this.platformMenuButtons = [
			{
				title: this.translate.instant('BUTTONS.EDIT'),
				show: true,
				disabled: false,
				icon: 'edit',
				method: () => this.editPlatform.emit()
			},
			{
				title: this.translate.instant('BUTTONS.DELETE'),
				show: true,
				disabled: false,
				icon: 'delete',
				method: () => this.deletePlatform.emit()
			}
		];
	}

}
