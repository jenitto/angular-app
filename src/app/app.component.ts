import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { filter, tap } from 'rxjs/operators';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

	@ViewChild('sidenav', { static: true }) sidenavRef: MatSidenav;

	constructor(
		private sidenavService: SidenavService,
		private translate: TranslateService,
	) {
		translate.addLangs(['es', 'en']);
		translate.setDefaultLang('es');

		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
	}

	ngAfterViewInit(): void {
		this.listenOnSidenavOpen();
		this.listenOnSidenavClose();
		this.listenOnMatSidenavCloseFinish();
	}

	private listenOnSidenavOpen(): void {
		this.sidenavService.open$.subscribe(() => this.sidenavRef.open());
	}

	private listenOnSidenavClose(): void {
		this.sidenavService.close$.subscribe(() => this.sidenavRef.close());
	}

	private listenOnMatSidenavCloseFinish(): void {
		this.sidenavRef.openedChange
			.pipe(
				filter((status: boolean) => !status),
				tap(() => this.sidenavService.detachComponent())
			)
			.subscribe();
	}

	onKeyDownEscape(): void {
		this.sidenavService.close();
	}

	onBackDropClick(): void {
		this.sidenavService.close();
	}

}
