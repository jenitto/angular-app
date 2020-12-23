import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from 'src/app/shared/lib/interfaces/rawg/game.interface';

@Component({
	selector: 'app-games-list',
	templateUrl: './games-list.component.html',
	styleUrls: ['./games-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesListComponent {

	@Input() games: Game[];
	@Input() skeletons: any[];

	@Output() deleteGame = new EventEmitter<Game>();
	@Output() renameGame = new EventEmitter<Game>();
	@Output() goToGame = new EventEmitter<Game>();

}
