import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PlatformsListComponent } from 'src/app/main/platforms/components/platforms-list/platforms-list.component';
import { NewPlatformComponent } from 'src/app/main/platforms/containers/new-platform/new-platform.component';
import { PlatformsComponent } from 'src/app/main/platforms/containers/platforms/platforms.component';
import { PlatformsRoutingModule } from 'src/app/main/platforms/platforms-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		InfiniteScrollModule,
		PlatformsRoutingModule,
	],
	declarations: [
		PlatformsComponent,
		PlatformsListComponent,
		NewPlatformComponent,
	],
	exports: [],
	entryComponents: []
})
export class PlatformsModule { }
