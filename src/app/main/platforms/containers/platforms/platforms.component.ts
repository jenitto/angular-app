import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { PlatformsFacade } from 'src/app/main/platforms/facades/platforms.facade';
import { SortDirectionName } from 'src/app/shared/lib/interfaces/sort-direction-name.enum';
import { CollectionService } from 'src/app/shared/lib/services/collection.service';
import { SidenavOpenerService } from 'src/app/shared/lib/utils/sidenav-opener.service';


@Component({
	selector: 'app-platforms',
	templateUrl: './platforms.component.html',
	styleUrls: ['./platforms.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PlatformsFacade, CollectionService]
})
export class PlatformsComponent extends SidenavOpenerService implements OnInit, OnDestroy {

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
		private platformsFacade: PlatformsFacade,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected injector: Injector,
		private router: Router,
	) {
		super(sidenavService, componentFactoryResolver, injector);
		this.projects$ = this.platformsFacade.projects$;
		this.areProjectsLoading$ = this.platformsFacade.areProjectsLoading$;
		this.areProjectsRefreshing$ = this.platformsFacade.areProjectsRefreshing$;
		this.haveProjectsLoaded$ = this.platformsFacade.haveProjectsLoaded$;
		this.checkScroll$ = this.platformsFacade.requestLoaded$;
	}

	ngOnInit(): void {
		this.platformsFacade.refreshProjects();
	}

	onSortChange(sort: Sort): void {
		this.platformsFacade.changeSort(sort);
	}

	onScrollDown(): void {
		this.platformsFacade.loadProjects();
	}

	// onOpenNewPlatformSidenav(): void {
	// 	this.openSidenav(NewProjectComponent);
	// }

	onGoToProject(project: any, recentProject = false) {
		if (project) {
			this.router.navigate(['project', project.id]);
		}
	}

	onDeleteProject(project: any) {
		this.platformsFacade.deleteProject(project);
	}

	// onEditProject(project: any) {
	// 	const data = this.sidenavService.createData({ ...project });

	// 	const comp: ComponentRef<NewProjectComponent> = this.openSidenav(NewProjectComponent, data);

	// 	comp.instance.updateProject.subscribe((updatedProject: any) => {
	// 		this.platformsFacade.updateProject(updatedProject);
	// 	});
	// }

	ngOnDestroy(): void {
		this.destroySubscriptions$.next();
		this.platformsFacade.destroySubscriptions();
		this.refreshSubscription.unsubscribe();
	}

}
