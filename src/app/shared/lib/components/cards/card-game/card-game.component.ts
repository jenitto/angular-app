import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/shared/lib/interfaces/rawg/game.interface';

@Component({
	selector: 'app-card-game',
	templateUrl: './card-game.component.html',
	styleUrls: ['./card-game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: []
})
export class CardGameComponent implements OnInit {
	@Input() game: Game;
	@Input() catalogueSelected = false;
	@Input() selected = false;
	@Input() menuButtonSize: '36px' | '48px';

	@Output() selectedChange = new EventEmitter<boolean>();
	@Output() deleteGame = new EventEmitter<Game>();
	@Output() duplicateGame = new EventEmitter<Game>();
	@Output() rename = new EventEmitter<Game>();

	backgroundImage: string;

	constructor(
		private router: Router,
	) { }

	ngOnInit(): void {
		if (this.game && this.game.background_image) {
			this.backgroundImage = `url('${this.game.background_image})')`;
		}
	}

	onSelectedChange(game: Game): void {
		if (game) {
			this.selectedChange.emit(!this.selected);
		}
	}

	goToGame(game: Game): void {
		if (game) {
			this.router.navigate(['game', game.id]);
		}
	}

	onRename(): void {
		this.rename.emit(this.game);
	}

	getPlatforms(): string {
		return this.game.platforms?.map((a) => a.platform.name).toString();
	}
}
