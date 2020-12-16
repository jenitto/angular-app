import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSimpleData } from 'src/app/shared/lib/components/dialogs/dialog-simple/dialog-simple-data.interface';

@Component({
	selector: 'app-dialog-simple',
	templateUrl: './dialog-simple.component.html',
	styleUrls: ['./dialog-simple.component.scss']
})
export class DialogSimpleComponent {

	constructor(
		public dialogRef: MatDialogRef<DialogSimpleComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogSimpleData) {
	}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onActionClick(id: number): void {
		this.dialogRef.close(id);
	}

}
