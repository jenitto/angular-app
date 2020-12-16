import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ContentComponent } from 'src/app/main/content/containers/content/content.component';
import { ContentRoutingModule } from 'src/app/main/content/content-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		ContentRoutingModule,
		InfiniteScrollModule
	],
	declarations: [
		ContentComponent,
	],
	exports: []
})
export class ContentModule { }
