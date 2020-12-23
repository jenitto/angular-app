import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RouteParams } from 'src/app/core/interfaces/route.interface';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CollectionType } from 'src/app/shared/lib/interfaces/collection-type.enum';
import { ConfirmAction } from 'src/app/shared/lib/interfaces/confirm-actions.enum';
import { Game } from 'src/app/shared/lib/interfaces/rawg/game.interface';
import { CollectionService } from 'src/app/shared/lib/services/collection.service';
import { ConfirmCatalogueService } from 'src/app/shared/lib/services/confirm-catalogue.service';

const GAMES_PAGE_SIZE = 20;

@Injectable()
export class GamesFacade {

	private sort: Sort = { active: 'rating', direction: 'desc' };

	private sortSource = new BehaviorSubject<Sort>(this.sort);

	games$: Observable<any[]>;
	areGamesLoading$: Observable<boolean>;
	areGamesRefreshing$: Observable<boolean>;
	haveGamesLoaded$: Observable<boolean>;
	requestLoaded$: Observable<void>;
	sort$ = this.sortSource.asObservable();

	private destroySubscriptions$ = new Subject<void>();

	constructor(
		private collectionService: CollectionService,
		private confirmCatalogueService: ConfirmCatalogueService,
		private snackBarService: SnackBarService,
		private translate: TranslateService,
	) {
		this.games$ = this.collectionService.collection$ as Observable<any[]>;
		this.areGamesLoading$ = this.collectionService.isCollectionLoading$;
		this.haveGamesLoaded$ = this.collectionService.hasCollectionLoaded$;
		this.requestLoaded$ = this.collectionService.requestLoaded$;
	}

	getRouteParams(): RouteParams {
		const params: RouteParams = {
			page_size: GAMES_PAGE_SIZE,
			dates: '1900-01-01,2021-06-30'
		};

		if (this.sort) {
			params.ordering = this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active;
		}

		return params;
	}

	loadGames(): void {
		this.collectionService.loadGames(this.getRouteParams());
	}

	refreshGames(): void {
		this.collectionService.refreshGames(this.getRouteParams());
	}

	changeSort(sort: Sort): void {
		this.sort = sort;
		this.sortSource.next(sort);
		this.refreshGames();
	}

	deleteGame(game: Game): void {
		const translation = this.translate.instant('ITEM.DELETED', {
			itemType: CollectionType.GAMES,
			itemName: game.name
		});

		this.confirmCatalogueService.launchDialog(game.name, ConfirmAction.DELETE)
			.pipe(
				filter(res => !!res),
				tap(() => {
					this.collectionService.removeItem(game.id);
					this.snackBarService.open(translation);
				}),
				// switchMap(() => this.gamesService.deleteItem(game.id))
			).subscribe();
	}

	updateGame(game: Game): void {
		const translation = this.translate.instant('ITEM.UPDATED', {
			itemType: CollectionType.GAMES,
			itemName: game.name
		});
		this.snackBarService.open(translation);
		this.collectionService.updateItem(game.id, game);
	}

	addGame(game: Game): void {
		const translation = this.translate.instant('ITEM.CREATED', {
			itemType: CollectionType.GAMES,
			itemName: game.name
		});
		this.snackBarService.open(translation);
		this.collectionService.addItem(game);
	}

	destroySubscriptions(): void {
		this.destroySubscriptions$.next();
		this.collectionService.destroySubscriptions();
	}

}
