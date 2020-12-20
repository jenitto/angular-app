import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, finalize, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { RouteParams } from 'src/app/core/interfaces/route.interface';
import { GamesService } from 'src/app/core/services/games.service';
import { GlobalLoadingService } from 'src/app/core/services/global-loading.service';
import { PlatformsService } from 'src/app/core/services/platforms.service';
import { CollectionType } from 'src/app/shared/lib/interfaces/collection-type.enum';
import { SortDirectionName } from 'src/app/shared/lib/interfaces/sort-direction-name.enum';
import { EntityCollection } from 'src/app/shared/lib/utils/entity-collection.class';

const INITIAL_PAGE = 1;
const INITIAL_IS_COLLECTION_LOADING = false;
const INITIAL_HAS_COLLECTION_LOADED = false;
const INITIAL_IS_COLLECTION_REFRESHING = false;

@Injectable()
export class CollectionService {

	private currentPage = INITIAL_PAGE;
	private collection: EntityCollection<any> = new EntityCollection<any>();
	private isCollectionLoadingSource = new BehaviorSubject<boolean>(INITIAL_IS_COLLECTION_LOADING);
	private isCollectionRefreshingSource = new BehaviorSubject<boolean>(INITIAL_IS_COLLECTION_REFRESHING);
	private hasCollectionLoadedSource = new BehaviorSubject<boolean>(INITIAL_HAS_COLLECTION_LOADED);
	private requestLoadedSource = new Subject<void>();

	collection$ = this.collection.getAllEntitiesAsync();
	isCollectionLoading$ = this.isCollectionLoadingSource.asObservable();
	isCollectionRefreshing$ = this.isCollectionRefreshingSource.asObservable();
	hasCollectionLoaded$ = this.hasCollectionLoadedSource.asObservable();
	requestLoaded$ = this.requestLoadedSource.asObservable();

	private destroySubscriptions$ = new Subject<void>();

	constructor(
		private globalLoadingService: GlobalLoadingService,
		private gamesService: GamesService,
		private platformsService: PlatformsService
	) { }

	private checkIfAllCatalogueHasLoaded(totalItems: number, pageSize: number): void {
		this.hasCollectionLoadedSource.next(totalItems < pageSize);
	}

	private addItemsToCollection(collection: any[], isRefreshing?: boolean): void {
		if (this.collection.getEntitiesCount() && !isRefreshing) {
			this.collection.addMany(collection);
		} else {
			this.collection.addAll(collection);
		}
	}

	private showLoader(isRefreshing: boolean): void {
		if (isRefreshing) {
			this.isCollectionRefreshingSource.next(true);
		} else {
			this.isCollectionLoadingSource.next(true);
		}
		if (this.currentPage === INITIAL_PAGE) {
			this.globalLoadingService.incrementLoader();
		}
	}

	private hideLoader(isRefreshing?: boolean): void {
		if (isRefreshing) {
			this.isCollectionRefreshingSource.next(false);
		} else {
			this.isCollectionLoadingSource.next(false);
		}
		this.globalLoadingService.decrementLoader();

	}

	private getCollection(type: CollectionType, params: RouteParams, isRefreshing?: boolean): void {
		const paramsWithPage: RouteParams = { ...params, page: this.currentPage };

		this.showLoader(isRefreshing);
		this.getHttpRequest(paramsWithPage, type)
			.pipe(
				tap((res: any) => {
					console.log('res:', res);
					const items = res['hydra:member'];

					if (isRefreshing) {
						this.hasCollectionLoadedSource.next(INITIAL_HAS_COLLECTION_LOADED);
					}
					this.addItemsToCollection(items, isRefreshing);
					this.checkIfAllCatalogueHasLoaded(items.length, params.itemsPerPage);
					this.currentPage++;
					this.requestLoadedSource.next();
				}),
				catchError((_: any, caught: Observable<any>) => {
					this.globalLoadingService.resetLoader();
					return throwError(caught);
				}),
				finalize(() => this.hideLoader(isRefreshing)),
				takeUntil(this.destroySubscriptions$)
			).subscribe();
	}

	private getHttpRequest(params: RouteParams, type: CollectionType): Observable<any> {
		switch (type) {
			case CollectionType.PLATFORMS:
				return this.platformsService.getItems(params);
			case CollectionType.GAMES:
				return this.gamesService.getItems(params);
		}
	}

	loadCollection(params: RouteParams, type: CollectionType): void {
		this.hasCollectionLoaded$.pipe(
			take(1),
			withLatestFrom(this.isCollectionLoading$, this.collection$),
			filter(([hasCollectionLoaded, isCollectionLoading, collection]: [boolean, boolean, any[]]) => {
				return !hasCollectionLoaded && !isCollectionLoading && collection && !!collection.length;
			}),
			tap(() => this.getCollection(type, params)),
			takeUntil(this.destroySubscriptions$)
		).subscribe();
	}

	refreshCollection(params: RouteParams, type: CollectionType): void {
		this.destroySubscriptions();
		this.clearPage();
		this.getCollection(type, params, true);
	}

	loadGames(params: RouteParams): void {
		this.loadCollection(params, CollectionType.GAMES);
	}

	refreshGames(params: RouteParams): void {
		this.refreshCollection(params, CollectionType.GAMES);
	}

	loadCatalogue(params: RouteParams): void {
		this.loadCollection(params, CollectionType.PLATFORMS);
	}

	refreshCatalogue(params: RouteParams): void {
		this.refreshCollection(params, CollectionType.PLATFORMS);
	}

	addItem(item: any): void {
		this.collection.addOne(item);
	}

	addItemInIndex(item: any, index: number): void {
		this.collection.addOneInIndex(item, index);
	}

	addItems(items: any[]): void {
		this.collection.addMany(items);
	}

	removeItem(itemId: string): void {
		this.collection.removeOne(itemId);
	}

	removeItems(itemsId: string[]): void {
		this.collection.removeMany(itemsId);
	}

	updateItem(itemId: string, item: any): void {
		this.collection.updateOne(itemId, item);
	}

	getCollectionItem(itemId: string): void {
		return this.collection.getOne(itemId);
	}

	sort(property: string, direction: SortDirectionName, from?: number, to?: number): void {
		this.collection.sort(property, direction, from, to);
	}

	clearPage(): void {
		this.currentPage = INITIAL_PAGE;
	}

	clearCollectionAndRefresh(params: RouteParams): void {
		this.clearCollection();
		this.refreshCatalogue(params);
	}

	clearGamesAndRefresh(params: RouteParams): void {
		this.clearCollection();
		this.refreshGames(params);
	}

	clearCollection(): void {
		this.collection.removeAll();
	}

	destroySubscriptions(): void {
		this.destroySubscriptions$.next();
	}

	getCurrentPage(): number {
		return this.currentPage;
	}

	getCollectionSync(): any[] {
		return this.collection.getAllEntitiesSync();
	}

}
