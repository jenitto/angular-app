import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./main/content/content.module').then(m => m.ContentModule)
	},
	// {
	// 	path: 'editor',
	// 	loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
	// },
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
