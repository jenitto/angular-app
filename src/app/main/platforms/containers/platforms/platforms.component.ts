import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ComponentRef, Injector, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { NewPlatformComponent } from 'src/app/main/platforms/containers/new-platform/new-platform.component';
import { PlatformsFacade } from 'src/app/main/platforms/facades/platforms.facade';
import { Platform } from 'src/app/shared/lib/interfaces/rawg/platform.interface';
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

	platforms$: Observable<any[]>;
	arePlatformsLoading$: Observable<boolean>;
	arePlatformsRefreshing$: Observable<boolean>;
	havePlatformsLoaded$: Observable<boolean>;
	checkScroll$: Observable<void>;

	platformsSkeletons = new Array(6);

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
		this.platforms$ = this.platformsFacade.platforms$;
		this.arePlatformsLoading$ = this.platformsFacade.arePlatformsLoading$;
		this.arePlatformsRefreshing$ = this.platformsFacade.arePlatformsRefreshing$;
		this.havePlatformsLoaded$ = this.platformsFacade.havePlatformsLoaded$;
		this.checkScroll$ = this.platformsFacade.requestLoaded$;
	}

	ngOnInit(): void {
		this.platformsFacade.refreshPlatforms();
	}

	onSortChange(sort: Sort): void {
		this.platformsFacade.changeSort(sort);
	}

	onScrollDown(): void {
		this.platformsFacade.loadPlatforms();
	}

	onOpenNewPlatformSidenav(): void {
		const comp: ComponentRef<NewPlatformComponent> = this.openSidenav(NewPlatformComponent);

		comp.instance.newPlatform.subscribe((updatedplatform: Platform) => {
			this.platformsFacade.addPlatform(updatedplatform);
		});
	}

	onGoToPlatform(platform: Platform): void {
		if (platform) {
			this.router.navigate(['games', platform.id]);
		}
	}

	onDeletePlatform(platform: Platform): void {
		this.platformsFacade.deletePlatform(platform);
	}

	onEditPlatform(platform: Platform): void {
		const data = this.sidenavService.createData({ ...platform });

		const comp: ComponentRef<NewPlatformComponent> = this.openSidenav(NewPlatformComponent, data);

		comp.instance.updatePlatform.subscribe((updatedplatform: Platform) => {
			this.platformsFacade.updatePlatform(updatedplatform);
		});
	}

	ngOnDestroy(): void {
		this.destroySubscriptions$.next();
		this.platformsFacade.destroySubscriptions();
		this.refreshSubscription.unsubscribe();
	}

}
