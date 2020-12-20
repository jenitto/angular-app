import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class SnackBarService {

	constructor(
		private snackBar: MatSnackBar,
		private translate: TranslateService
	) { }

	open(messageKey: string, showAction?: boolean): MatSnackBarRef<any> {
		const action = showAction ? this.translate.instant('COMMON.UNDO') : undefined;
		const snackBarRef = this.snackBar.open(messageKey, action, {
			duration: 3000,
			verticalPosition: 'top',
			horizontalPosition: 'right'
		});

		this.listenClickToDismissSnackBar(snackBarRef);

		return snackBarRef;
	}

	listenClickToDismissSnackBar(snackBarRef: MatSnackBarRef<any>) {
		const snacks = document.getElementsByClassName('mat-snack-bar-container');
		const snackEl = snacks.item(snacks.length - 1);
		snackEl.addEventListener('click', () => snackBarRef.dismiss());
	}

}
