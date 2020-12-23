import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GamesListComponent } from 'src/app/main/games/components/games-list/games-list.component';
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
		GamesListComponent,
	],
	exports: []
})
export class GamesModule { }
