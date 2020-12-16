import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NavOptionsComponent } from 'src/app/core/components/navbar/components/nav-options/nav-options.component';
import { UserMenuComponent } from 'src/app/core/components/navbar/components/nav-options/user-menu/user-menu.component';
import { NavTabsComponent } from 'src/app/core/components/navbar/components/nav-tabs/nav-tabs.component';
import { TrimBodyInterceptor } from 'src/app/core/interceptors/trim-body.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReloadAppDialogComponent } from './components/dialogs/reload-app-dialog/reload-app-dialog.component';

@NgModule({
	imports: [
		BrowserModule,
		SharedModule,
		RouterModule,
		HttpClientModule,
		BrowserAnimationsModule,
		InfiniteScrollModule,
	],
	declarations: [
		ReloadAppDialogComponent,
		NavTabsComponent,
		NavOptionsComponent,
		UserMenuComponent,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TrimBodyInterceptor,
			multi: true
		},
	],
	exports: [
		// GlobalSearcherComponent,
		ReloadAppDialogComponent,
		NavTabsComponent,
		NavOptionsComponent,
		UserMenuComponent,
	]
})
export class CoreModule { }
