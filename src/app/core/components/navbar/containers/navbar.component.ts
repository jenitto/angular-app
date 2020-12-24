import { Component, ComponentFactoryResolver, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { GlobalLoadingService } from 'src/app/core/services/global-loading.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { DialogSimpleComponent } from 'src/app/shared/lib/components/dialogs/dialog-simple/dialog-simple.component';
import { dialogSimpleFactory } from 'src/app/shared/lib/components/dialogs/dialog-simple/dialog-simple.factory';
import { SidenavOpenerService } from 'src/app/shared/lib/utils/sidenav-opener.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends SidenavOpenerService implements OnInit {

	globalLoading = false;

	isSidenavOpened$: Observable<boolean>;

	constructor(
		private globalLoadingService: GlobalLoadingService,
		private router: Router,
		private matDialog: MatDialog,
		private translate: TranslateService,
		protected sidenavService: SidenavService,
		protected componentFactoryResolver: ComponentFactoryResolver,
		protected injector: Injector
	) {
		super(sidenavService, componentFactoryResolver, injector);
	}

	ngOnInit(): void {
		this.getLoadingStatus();
		this.listenSidenavState();
	}

	onGoToHome(): void {
		this.router.navigate(['/'], {});
	}

	private getLoadingStatus(): void {
		this.globalLoadingService.loading$.subscribe((status: number) => {
			this.globalLoading = !!status;
		});
	}

	private listenSidenavState(): void {
		this.isSidenavOpened$ = this.sidenavService.isOpened$;
	}

	// Navbar options methods

	onOpenVersionDialog(): void {
		const dialogConfig = dialogSimpleFactory({
			icon: 'icon-logo-cloud',
			title: `Proyecto de prueba Angular`,
			description: 'Developed by @ssantiagoperez',
			textAlign: 'center',
			showCancelButton: false,
			actions: [{ label: this.translate.instant('BUTTONS.CLOSE'), id: 1 }]
		});

		this.matDialog.open(DialogSimpleComponent, dialogConfig);
	}

}
