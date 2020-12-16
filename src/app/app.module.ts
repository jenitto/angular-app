import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavbarComponent } from 'src/app/core/components/navbar/containers/navbar.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppComponent } from './app.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
	return new TranslateHttpLoader(httpClient);
}

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		}),
		CoreModule,
		AppRoutingModule,
		MatSidenavModule,
		SharedModule,
	],
	providers: [],
	entryComponents: [
		// ReloadAppDialogComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
