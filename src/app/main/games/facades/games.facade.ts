import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RouteParams } from 'src/app/core/interfaces/route.interface';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { ConfirmAction } from 'src/app/shared/lib/interfaces/confirm-actions.enum';
import { CollectionService } from 'src/app/shared/lib/services/collection.service';
import { ConfirmCatalogueService } from 'src/app/shared/lib/services/confirm-catalogue.service';

const PROJECTS_PAGE_SIZE = 20;

@Injectable()
export class GamesFacade {

	private sort: Sort = { active: 'name', direction: 'asc' };

	private sortSource = new BehaviorSubject<Sort>(this.sort);

	projects$: Observable<any[]>;
	areProjectsLoading$: Observable<boolean>;
	areProjectsRefreshing$: Observable<boolean>;
	haveProjectsLoaded$: Observable<boolean>;
	requestLoaded$: Observable<void>;
	sort$ = this.sortSource.asObservable();

	private destroySubscriptions$ = new Subject<void>();

	constructor(
		private collectionService: CollectionService,
		private confirmCatalogueService: ConfirmCatalogueService,
		private snackBarService: SnackBarService,
		private translate: TranslateService,
	) {
		this.projects$ = this.collectionService.collection$ as Observable<any[]>;
		this.areProjectsLoading$ = this.collectionService.isCollectionLoading$;
		this.haveProjectsLoaded$ = this.collectionService.hasCollectionLoaded$;
		this.requestLoaded$ = this.collectionService.requestLoaded$;
	}

	getRouteParams(): RouteParams {
		const params: RouteParams = {
			itemsPerPage: PROJECTS_PAGE_SIZE,
		};

		if (this.sort) {
			params.order = { [this.sort.active]: this.sort.direction };
		}

		return params;
	}

	loadProjects(): void {
		this.collectionService.loadGames(this.getRouteParams());
	}

	refreshProjects(): void {
		this.collectionService.refreshGames(this.getRouteParams());
	}

	// loadRecentProjects() {
	// 	const params: RouteParams = {
	// 		page: 1,
	// 		itemsPerPage: RECENT_PROJECTS_PAGE_SIZE,
	// 		order: {
	// 			updatedAt: 'desc'
	// 		}
	// 	};

	// 	this.platformsService.getItems(params).pipe(
	// 		takeUntil(this.destroySubscriptions$)
	// 	).subscribe((res: HydraCollection<Catalogue>) => {
	// 		this.recentProjects.addAll(res['hydra:member'] as Project[]);
	// 	});
	// }

	changeSort(sort: Sort): void {
		this.sort = sort;
		this.sortSource.next(sort);
		this.refreshProjects();
	}

	deleteProject(project: any): void {
		const translation = this.translate.instant('ITEM.DELETED', {
			itemType: project['@type'],
			itemName: project.name
		});

		this.confirmCatalogueService.launchDialog(project.name, ConfirmAction.DELETE)
			.pipe(
				filter(res => !!res),
				tap(() => {
					this.collectionService.removeItem(project.id);
					this.snackBarService.open(translation);
				}),
				// switchMap(() => this.platformsService.deleteItem(project.id))
			).subscribe();
	}

	updateProject(project: any): void {
		this.collectionService.updateItem(project.id, project);
	}

	destroySubscriptions(): void {
		this.destroySubscriptions$.next();
		this.collectionService.destroySubscriptions();
	}

}
