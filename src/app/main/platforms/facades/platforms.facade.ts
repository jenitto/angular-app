import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RouteParams } from 'src/app/core/interfaces/route.interface';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CollectionType } from 'src/app/shared/lib/interfaces/collection-type.enum';
import { ConfirmAction } from 'src/app/shared/lib/interfaces/confirm-actions.enum';
import { Platform } from 'src/app/shared/lib/interfaces/rawg/platform.interface';
import { CollectionService } from 'src/app/shared/lib/services/collection.service';
import { ConfirmCatalogueService } from 'src/app/shared/lib/services/confirm-catalogue.service';

const PLATFORMS_PAGE_SIZE = 20;

@Injectable()
export class PlatformsFacade {

	private sort: Sort = { active: 'name', direction: 'asc' };

	private sortSource = new BehaviorSubject<Sort>(this.sort);

	platforms$: Observable<any[]>;
	arePlatformsLoading$: Observable<boolean>;
	arePlatformsRefreshing$: Observable<boolean>;
	havePlatformsLoaded$: Observable<boolean>;
	requestLoaded$: Observable<void>;
	sort$ = this.sortSource.asObservable();

	private destroySubscriptions$ = new Subject<void>();

	constructor(
		private collectionService: CollectionService,
		private confirmCatalogueService: ConfirmCatalogueService,
		private snackBarService: SnackBarService,
		private translate: TranslateService,
	) {
		this.platforms$ = this.collectionService.collection$ as Observable<any[]>;
		this.arePlatformsLoading$ = this.collectionService.isCollectionLoading$;
		this.havePlatformsLoaded$ = this.collectionService.hasCollectionLoaded$;
		this.requestLoaded$ = this.collectionService.requestLoaded$;
	}

	getRouteParams(): RouteParams {
		const params: RouteParams = {
			page_size: PLATFORMS_PAGE_SIZE,
		};

		if (this.sort) {
			params.ordering = this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active;
		}

		return params;
	}

	loadPlatforms(): void {
		this.collectionService.loadPlatforms(this.getRouteParams());
	}

	refreshPlatforms(): void {
		this.collectionService.refreshPlatforms(this.getRouteParams());
	}

	changeSort(sort: Sort): void {
		this.sort = sort;
		this.sortSource.next(sort);
		this.refreshPlatforms();
	}

	deletePlatform(platform: Platform): void {
		const translation = this.translate.instant('ITEM.DELETED', {
			itemType: CollectionType.PLATFORMS,
			itemName: platform.name
		});

		this.confirmCatalogueService.launchDialog(platform.name, ConfirmAction.DELETE)
			.pipe(
				filter(res => !!res),
				tap(() => {
					this.collectionService.removeItem(platform.id);
					this.snackBarService.open(translation);
				}),
				// switchMap(() => this.platformsService.deleteItem(Platform.id))
			).subscribe();
	}

	updatePlatform(platform: Platform): void {
		this.collectionService.updateItem(platform.id, platform);
	}

	addPlatform(platform: Platform): void {
		this.collectionService.addItem(platform);
	}

	destroySubscriptions(): void {
		this.destroySubscriptions$.next();
		this.collectionService.destroySubscriptions();
	}

}
