import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GamesComponent } from 'src/app/main/games/containers/games/games.component';
import { GamesRoutingModule } from 'src/app/main/games/games-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		InfiniteScrollModule,
		GamesRoutingModule,
	],
	declarations: [
		GamesComponent,
	],
	exports: []
})
export class GamesModule { }
