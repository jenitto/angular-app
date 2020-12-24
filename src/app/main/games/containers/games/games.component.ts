import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { GamesFacade } from 'src/app/main/games/facades/games.facade';
import { Game } from 'src/app/shared/lib/interfaces/rawg/game.interface';
import { SortDirectionName } from 'src/app/shared/lib/interfaces/sort-direction-name.enum';
import { CollectionService } from 'src/app/shared/lib/services/collection.service';
import { SidenavOpenerService } from 'src/app/shared/lib/utils/sidenav-opener.service';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [GamesFacade, CollectionService]
})
export class GamesComponent extends SidenavOpenerService implements OnInit, OnDestroy {

	sortOptions: Sort[] = [
		{ active: 'rating', direction: SortDirectionName.DESC },
		{ active: 'metacritic', direction: SortDirectionName.DESC },
		{ active: 'released', direction: SortDirectionName.ASC },
		{ active: 'released', direction: SortDirectionName.DESC },
		{ active: 'name', direction: SortDirectionName.ASC },
		{ active: 'name', direction: SortDirectionName.DESC },
	];

	games$: Observable<any[]>;
	areGamesLoading$: Observable<boolean>;
	areGamesRefreshing$: Observable<boolean>;
	haveGamesLoaded$: Observable<boolean>;
	checkScroll$: Observable<void>;

	gamesSkeletons = new Array(6);

	private refreshSubscription = new Subscription();
	private destroySubscriptions$ = new Subject<void>();

	constructor(
		protected sidenavService: SidenavService,
		private gamesFacade: GamesFacade,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected injector: Injector,
		private router: Router,
	) {
		super(sidenavService, componentFactoryResolver, injector);
		this.games$ = this.gamesFacade.games$;
		this.areGamesLoading$ = this.gamesFacade.areGamesLoading$;
		this.areGamesRefreshing$ = this.gamesFacade.areGamesRefreshing$;
		this.haveGamesLoaded$ = this.gamesFacade.haveGamesLoaded$;
		this.checkScroll$ = this.gamesFacade.requestLoaded$;
	}

	ngOnInit(): void {
		this.gamesFacade.refreshGames();
	}

	onSortChange(sort: Sort): void {
		this.gamesFacade.changeSort(sort);
	}

	onScrollDown(): void {
		this.gamesFacade.loadGames();
	}

	onGoToGame(game: Game): void {
		if (game) {
			this.router.navigate(['game', game.id]);
		}
	}

	onDeleteGame(game: Game): void {
		this.gamesFacade.deleteGame(game);
	}

	onRenameGame(game: Game): void {
		// TO DO
	}

	onDuplicateGame(game: Game): void {
		// TO DO
	}

	onSearch(term: string): void {
		this.gamesFacade.search(term);
	}

	onCloseSearcher(): void {
		this.gamesFacade.cleanSearch();
	}

	ngOnDestroy(): void {
		this.destroySubscriptions$.next();
		this.gamesFacade.destroySubscriptions();
		this.refreshSubscription.unsubscribe();
	}

}
