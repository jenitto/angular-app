import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LibModule } from 'src/app/shared/lib/lib.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
		TranslateModule,
		LibModule,
	],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
		TranslateModule,
		LibModule,
	]
})
export class SharedModule { }
