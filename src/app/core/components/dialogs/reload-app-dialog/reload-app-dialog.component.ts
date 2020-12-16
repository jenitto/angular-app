import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-reload-app-dialog',
	templateUrl: './reload-app-dialog.component.html',
	styleUrls: ['./reload-app-dialog.component.scss']
})
export class ReloadAppDialogComponent implements OnInit {

	constructor(
		private matDialogRef: MatDialogRef<ReloadAppDialogComponent>
	) { }

	ngOnInit() {
	}

	onReload() {
		this.matDialogRef.close();
	}

}
