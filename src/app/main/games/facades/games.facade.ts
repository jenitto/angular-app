import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RouteParams } from 'src/app/core/interfaces/route.interface';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { DialogInputComponent } from 'src/app/shared/lib/components/dialogs/dialog-input/dialog-input.component';
import { dialogInputFactory } from 'src/app/shared/lib/components/dialogs/dialog-input/dialog-input.factory';
import { CollectionType } from 'src/app/shared/lib/interfaces/collection-type.enum';
import { ConfirmAction } from 'src/app/shared/lib/interfaces/confirm-actions.enum';
import { Game } from 'src/app/shared/lib/interfaces/rawg/game.interface';
import { CollectionService } from 'src/app/shared/lib/services/collection.service';
import { ConfirmCatalogueService } from 'src/app/shared/lib/services/confirm-catalogue.service';


const GAMES_PAGE_SIZE = 20;

@Injectable()
export class GamesFacade {

	private sort: Sort = { active: 'rating', direction: 'desc' };
	private searchTerm = '';

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
		private dialog: MatDialog,
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
		if (this.searchTerm) {
			params.search = this.searchTerm;
		}

		return params;
	}

	loadGames(): void {
		this.collectionService.loadGames(this.getRouteParams());
	}

	refreshGames(): void {
		this.collectionService.refreshGames(this.getRouteParams());
	}

	search(term: string): void {
		this.searchTerm = term;
		this.refreshGames();
	}

	cleanSearch(): void {
		if (this.searchTerm !== '') {
			this.searchTerm = '';
			this.refreshGames();
		}
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

	renameGame(game: Game): void {
		const newTitle = this.translate.instant('ITEM.RENAME', { itemName: game.name });
		const newAction = this.translate.instant('BUTTONS.RENAME');
		const newInputText = game.name;
		const data = {
			title: newTitle,
			action: newAction,
			inputText: newInputText,
			minLength: 3,
			maxLength: 255,
			isEdit: true
		};
		const dialogConfig = dialogInputFactory(data);

		this.dialog.open(DialogInputComponent, dialogConfig)
			.afterClosed()
			.pipe(
				filter((result: boolean) => !!result),
				tap((result: any) => {
					const newGameData = { ...game, name: result.text };
					this.collectionService.updateItem(game.id, newGameData);
					this.snackBarService.open(this.translate.instant('ITEM.RENAMED', { itemName: newInputText }));
				})
			).subscribe();
	}

	destroySubscriptions(): void {
		this.destroySubscriptions$.next();
		this.collectionService.destroySubscriptions();
	}

}
