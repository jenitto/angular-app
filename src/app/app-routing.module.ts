import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./main/platforms/platforms.module').then(m => m.PlatformsModule)
	},
	{
		path: 'games',
		loadChildren: () => import('./main/games/games.module').then(m => m.GamesModule)
	},
	// {
	// 	path: 'preview',
	// 	loadChildren: () => import('./preview/preview.module').then(m => m.PreviewModule)
	// },
	// {
	// 	path: 'unit',
	// 	loadChildren: () => import('./unit/unit.module').then(m => m.UnitModule)
	// },
	{
		path: '**',
		redirectTo: '/404',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule { }
