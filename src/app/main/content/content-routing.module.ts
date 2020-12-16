import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from 'src/app/main/content/containers/content/content.component';

const routes: Routes = [
	{
		path: '',
		component: ContentComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	declarations: [],
	exports: [RouterModule],
	providers: []
})
export class ContentRoutingModule { }
