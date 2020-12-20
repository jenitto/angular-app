import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DialogSimpleComponent } from 'src/app/shared/lib/components/dialogs/dialog-simple/dialog-simple.component';
import { SelectComponent } from 'src/app/shared/lib/components/select/select.component';
import { SidenavToolbarComponent } from 'src/app/shared/lib/components/sidenav-toolbar/sidenav-toolbar.component';
import { SpinnerComponent } from 'src/app/shared/lib/components/spinner/spinner.component';
import { ClickOutsideDirective } from 'src/app/shared/lib/directives/click-outside.directive';
import { ParallaxDirective } from 'src/app/shared/lib/directives/parallax.directive';
import { ScrollingDirective } from 'src/app/shared/lib/directives/scrolling.directive';
import { FileSizePipe } from 'src/app/shared/lib/pipes/file-size.pipe';
import { FirstLetterPipe } from 'src/app/shared/lib/pipes/first-letter.pipe';
import { ReversePipe } from 'src/app/shared/lib/pipes/reverse.pipe';
import { SafeStylePipe } from 'src/app/shared/lib/pipes/sanitize/safe-style.pipe';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AutoLoadDirective } from './directives/auto-load.directive';
import { SafeUrlPipe } from './pipes/sanitize/safe-url.pipe';
import { TranslateCutPipe } from './pipes/translate-cut.pipe';
@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		RouterModule,
		InfiniteScrollModule,
		TranslateModule
	],
	declarations: [
		ClickOutsideDirective,
		SafeStylePipe,
		FileSizePipe,
		FirstLetterPipe,
		ScrollingDirective,
		ParallaxDirective,
		ReversePipe,
		TranslateCutPipe,
		AutoLoadDirective,
		SafeUrlPipe,
		DialogSimpleComponent,
		SidenavToolbarComponent,
		SpinnerComponent,
		SelectComponent,
	],
	exports: [
		ReactiveFormsModule,
		ClickOutsideDirective,
		SafeStylePipe,
		SafeUrlPipe,
		FileSizePipe,
		FirstLetterPipe,
		ScrollingDirective,
		ParallaxDirective,
		ReversePipe,
		TranslateCutPipe,
		AutoLoadDirective,
		DialogSimpleComponent,
		SidenavToolbarComponent,
		SpinnerComponent,
		SelectComponent,
	],
	entryComponents: [
		DialogSimpleComponent,
	]
})
export class LibModule { }
