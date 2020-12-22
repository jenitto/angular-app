import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MESSAGE_FORMAT_CONFIG, TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { from, Observable } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavbarComponent } from 'src/app/core/components/navbar/containers/navbar.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppComponent } from './app.component';

export class WebpackTranslateLoader implements TranslateLoader {
	getTranslation(lang: string): Observable<any> {
		return from(import(`../assets/i18n/${lang}.json`));
	}
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
				useClass: WebpackTranslateLoader
			},
			compiler: {
				provide: TranslateCompiler,
				useClass: TranslateMessageFormatCompiler
			}
		}),
		CoreModule,
		AppRoutingModule,
		MatSidenavModule,
		SharedModule,
	],
	providers: [{ provide: MESSAGE_FORMAT_CONFIG, useValue: { locales: ['es', 'en'] } }],
	entryComponents: [
		// ReloadAppDialogComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
