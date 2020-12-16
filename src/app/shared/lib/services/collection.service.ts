import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, finalize, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { CatalogueService } from 'src/app/core/services/catalogue.service';
import { GlobalLoadingService } from 'src/app/core/services/global-loading.service';
import { UserService } from 'src/app/core/services/user.service';
import { Collection } from 'src/app/shared/interfaces/collection.type';
import { HydraCollection } from 'src/app/shared/interfaces/hydra-collection';
import { RouteParams } from 'src/app/shared/interfaces/route.interface';
import { SortDirectionName } from 'src/app/shared/interfaces/sort-direction-name.enum';
import { UserType } from 'src/app/shared/interfaces/user-type.enum';
import { EntityCollection } from 'src/app/shared/lib/utils/entity-collection.class';

const INITIAL_PAGE = 1;
const INITIAL_IS_COLLECTION_LOADING = false;
const INITIAL_HAS_COLLECTION_LOADED = false;
const INITIAL_IS_COLLECTION_REFRESHING = false;

@Injectable()
export class CollectionService {

	private currentPage = INITIAL_PAGE;
	private collection: EntityCollection<Collection> = new EntityCollection<Collection>();
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
		private userService: UserService,
		private catalogueService: CatalogueService
	) { }

	private checkIfAllCatalogueHasLoaded(totalItems: number, pageSize: number) {
		this.hasCollectionLoadedSource.next(totalItems < pageSize);
	}

	private addItemsToCollection(collection: Collection[], isRefreshing?: boolean) {
		if (this.collection.getEntitiesCount() && !isRefreshing) {
			this.collection.addMany(collection);
		} else {
			this.collection.addAll(collection);
		}
	}

	private showLoader(isRefreshing: boolean) {
		if (isRefreshing) {
			this.isCollectionRefreshingSource.next(true);
		} else {
			this.isCollectionLoadingSource.next(true);
		}
		if (this.currentPage === INITIAL_PAGE) {
			this.globalLoadingService.incrementLoader();
		}
	}

	private hideLoader(isRefreshing?: boolean) {
		if (isRefreshing) {
			this.isCollectionRefreshingSource.next(false);
		} else {
			this.isCollectionLoadingSource.next(false);
		}
		this.globalLoadingService.decrementLoader();

	}

	private getCollection(type: string, params: RouteParams, isRefreshing?: boolean) {
		const paramsWithPage: RouteParams = { ...params, page: this.currentPage };

		this.showLoader(isRefreshing);
		this.getHttpRequest(paramsWithPage, type)
			.pipe(
				tap((res: HydraCollection<Collection>) => {
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

	private getHttpRequest(params: RouteParams, type?: string): Observable<HydraCollection<Collection>> {
		switch (type) {
			case UserType.USER:
				return this.userService.getUsers(params);
			default:
				return this.catalogueService.getItems(params);
		}
	}

	loadCollection(params: RouteParams, type?: string) {
		this.hasCollectionLoaded$.pipe(
			take(1),
			withLatestFrom(this.isCollectionLoading$, this.collection$),
			filter(([hasCollectionLoaded, isCollectionLoading, collection]: [boolean, boolean, Collection[]]) => {
				return !hasCollectionLoaded && !isCollectionLoading && collection && !!collection.length;
			}),
			tap(() => this.getCollection(type, params)),
			takeUntil(this.destroySubscriptions$)
		).subscribe();
	}

	refreshCollection(params: RouteParams, type?: string) {
		this.destroySubscriptions();
		this.clearPage();
		this.getCollection(type, params, true);
	}

	loadUsers(params: RouteParams) {
		this.loadCollection(params, UserType.USER);
	}

	refreshUsers(params: RouteParams) {
		this.refreshCollection(params, UserType.USER);
	}

	loadCatalogue(params: RouteParams) {
		this.loadCollection(params);
	}

	refreshCatalogue(params: RouteParams) {
		this.refreshCollection(params);
	}

	addItem(item: Collection) {
		this.collection.addOne(item);
	}

	addItemInIndex(item: Collection, index: number) {
		this.collection.addOneInIndex(item, index);
	}

	addItems(items: Collection[]) {
		this.collection.addMany(items);
	}

	removeItem(itemId: string) {
		this.collection.removeOne(itemId);
	}

	removeItems(itemsId: string[]) {
		this.collection.removeMany(itemsId);
	}

	updateItem(itemId: string, item: Collection) {
		this.collection.updateOne(itemId, item);
	}

	getCollectionItem(itemId: string) {
		return this.collection.getOne(itemId);
	}

	sort(property: string, direction: SortDirectionName, from?: number, to?: number) {
		this.collection.sort(property, direction, from, to);
	}

	clearPage() {
		this.currentPage = INITIAL_PAGE;
	}

	clearCollectionAndRefresh(params: RouteParams) {
		this.clearCollection();
		this.refreshCatalogue(params);
	}

	clearUsersAndRefresh(params: RouteParams) {
		this.clearCollection();
		this.refreshUsers(params);
	}

	clearCollection() {
		this.collection.removeAll();
	}

	destroySubscriptions() {
		this.destroySubscriptions$.next();
	}

	getCurrentPage(): number {
		return this.currentPage;
	}

	getCollectionSync(): Collection[] {
		return this.collection.getAllEntitiesSync();
	}

}
