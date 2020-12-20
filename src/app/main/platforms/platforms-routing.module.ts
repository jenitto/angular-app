import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformsComponent } from 'src/app/main/platforms/containers/platforms/platforms.component';

const routes: Routes = [
	{
		path: '',
		component: PlatformsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	declarations: [],
	exports: [RouterModule],
	providers: []
})
export class PlatformsRoutingModule { }
