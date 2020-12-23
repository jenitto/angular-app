import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuButton } from 'src/app/shared/lib/components/menu-buttons/menu-buttons.interface';
import { Game } from 'src/app/shared/lib/interfaces/rawg/game.interface';

@Component({
	selector: 'app-card-game-menu',
	templateUrl: './card-game-menu.component.html',
	styleUrls: ['./card-game-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: []
})
export class CardGameMenuComponent implements OnInit {

	@Input() disabled = false;
	@Input() game: Game;
	@Input() size: '36px' | '48px' = '36px';
	@Input() color: 'white' | 'grey' = 'grey';

	@Output() delete = new EventEmitter<void>();
	@Output() duplicate = new EventEmitter<void>();
	@Output() rename = new EventEmitter<void>();

	cardGameMenuButtons: MenuButton[] = [];

	constructor(
		private translate: TranslateService
	) { }

	ngOnInit(): void {
		this.updateMenuButtons();
	}

	updateMenuButtons(): void {
		this.cardGameMenuButtons = [
			{
				title: this.translate.instant('BUTTONS.RENAME'),
				show: true,
				disabled: false,
				icon: 'edit',
				method: () => this.rename.emit()
			},
			{
				title: this.translate.instant('BUTTONS.DELETE'),
				show: true,
				disabled: false,
				icon: 'delete',
				method: () => this.delete.emit()
			},
			{
				title: this.translate.instant('BUTTONS.DUPLICATE'),
				show: true,
				disabled: false,
				icon: 'content_copy',
				method: () => this.duplicate.emit()
			}
		];
	}

}
