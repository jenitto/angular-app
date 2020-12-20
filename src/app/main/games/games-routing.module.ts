import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from 'src/app/main/games/containers/games/games.component';

const routes: Routes = [
	{
		path: '',
		component: GamesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	declarations: [],
	exports: [RouterModule],
	providers: []
})
export class GamesRoutingModule { }
