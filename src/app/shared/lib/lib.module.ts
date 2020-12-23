import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardGameMenuComponent } from 'src/app/shared/lib/components/cards/card-game/card-game-menu/card-game-menu.component';
import { CardGameComponent } from 'src/app/shared/lib/components/cards/card-game/card-game.component';
import { CardPlatformMenuComponent } from 'src/app/shared/lib/components/cards/card-platform/card-platform-menu/card-platform-menu.component';
import { CardPlatformComponent } from 'src/app/shared/lib/components/cards/card-platform/card-platform.component';
import { DialogSimpleComponent } from 'src/app/shared/lib/components/dialogs/dialog-simple/dialog-simple.component';
import { EmptyComponent } from 'src/app/shared/lib/components/empty/empty.component';
import { MenuButtonsComponent } from 'src/app/shared/lib/components/menu-buttons/menu-buttons.component';
import { SelectComponent } from 'src/app/shared/lib/components/select/select.component';
import { SidenavToolbarComponent } from 'src/app/shared/lib/components/sidenav-toolbar/sidenav-toolbar.component';
import { SpinnerComponent } from 'src/app/shared/lib/components/spinner/spinner.component';
import { ClickOutsideDirective } from 'src/app/shared/lib/directives/click-outside.directive';
import { ParallaxDirective } from 'src/app/shared/lib/directives/parallax.directive';
import { ScrollingDirective } from 'src/app/shared/lib/directives/scrolling.directive';
import { FileSizePipe } from 'src/app/shared/lib/pipes/file-size.pipe';
import { FirstLetterPipe } from 'src/app/shared/lib/pipes/first-letter.pipe';
import { NameToColorsPipe } from 'src/app/shared/lib/pipes/name-to-colors.pipe';
import { ReversePipe } from 'src/app/shared/lib/pipes/reverse.pipe';
import { SafeStylePipe } from 'src/app/shared/lib/pipes/sanitize/safe-style.pipe';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ButtonFabComponent } from './components/buttons/button-fab/button-fab.component';
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
		NameToColorsPipe,
		AutoLoadDirective,
		SafeUrlPipe,
		DialogSimpleComponent,
		SidenavToolbarComponent,
		SpinnerComponent,
		SelectComponent,
		CardPlatformComponent,
		CardPlatformMenuComponent,
		CardGameComponent,
		CardGameMenuComponent,
		EmptyComponent,
		MenuButtonsComponent,
		ButtonFabComponent,
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
		NameToColorsPipe,
		AutoLoadDirective,
		DialogSimpleComponent,
		SidenavToolbarComponent,
		SpinnerComponent,
		SelectComponent,
		CardPlatformComponent,
		CardPlatformMenuComponent,
		CardGameComponent,
		CardGameMenuComponent,
		EmptyComponent,
		MenuButtonsComponent,
		ButtonFabComponent,
	],
	entryComponents: [
		DialogSimpleComponent,
	]
})
export class LibModule { }
