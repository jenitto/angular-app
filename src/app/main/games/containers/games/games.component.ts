import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { GamesFacade } from 'src/app/main/games/facades/games.facade';
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
		{ active: 'name', direction: SortDirectionName.ASC },
		{ active: 'name', direction: SortDirectionName.DESC }
	];

	projects$: Observable<any[]>;
	areProjectsLoading$: Observable<boolean>;
	areProjectsRefreshing$: Observable<boolean>;
	haveProjectsLoaded$: Observable<boolean>;
	checkScroll$: Observable<void>;

	projectsSkeletons$ = new Array(3);

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
		this.projects$ = this.gamesFacade.projects$;
		this.areProjectsLoading$ = this.gamesFacade.areProjectsLoading$;
		this.areProjectsRefreshing$ = this.gamesFacade.areProjectsRefreshing$;
		this.haveProjectsLoaded$ = this.gamesFacade.haveProjectsLoaded$;
		this.checkScroll$ = this.gamesFacade.requestLoaded$;
	}

	ngOnInit(): void {
		this.gamesFacade.refreshProjects();
	}

	onSortChange(sort: Sort): void {
		this.gamesFacade.changeSort(sort);
	}

	onScrollDown(): void {
		this.gamesFacade.loadProjects();
	}

	// onOpenNewPlatformSidenav(): void {
	// 	this.openSidenav(NewProjectComponent);
	// }

	// onOpenPermissionsManager(project: any) {
	// 	const data = this.sidenavService.createData({
	// 		catalogue: project
	// 	});
	// 	this.openSidenav(CatalogueUsersRolesComponent, data);
	// }

	onGoToProject(project: any, recentProject = false) {
		if (project) {
			this.router.navigate(['project', project.id]);
		}
	}

	onDeleteProject(project: any) {
		this.gamesFacade.deleteProject(project);
	}

	// onEditProject(project: any) {
	// 	const data = this.sidenavService.createData({ ...project });

	// 	const comp: ComponentRef<NewProjectComponent> = this.openSidenav(NewProjectComponent, data);

	// 	comp.instance.updateProject.subscribe((updatedProject: any) => {
	// 		this.gamesFacade.updateProject(updatedProject);
	// 	});
	// }

	ngOnDestroy(): void {
		this.destroySubscriptions$.next();
		this.gamesFacade.destroySubscriptions();
		this.refreshSubscription.unsubscribe();
	}

}
