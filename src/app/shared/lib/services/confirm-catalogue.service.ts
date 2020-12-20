import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ConfirmAction } from 'src/app/shared/lib/interfaces/confirm-actions.enum';
import { DialogSimpleComponent } from '../components/dialogs/dialog-simple/dialog-simple.component';
import { dialogSimpleFactory } from '../components/dialogs/dialog-simple/dialog-simple.factory';

@Injectable({
	providedIn: 'root'
})
export class ConfirmCatalogueService {

	constructor(
		private dialog: MatDialog,
		private translate: TranslateService
	) { }

	private openDialog(dialogData: MatDialogConfig<any>): Observable<any> {
		return this.dialog.open(DialogSimpleComponent, dialogData).afterClosed();
	}

	launchDialog(itemName: string, action: ConfirmAction): Observable<MatDialogRef<any>> {
		const dialogData = dialogSimpleFactory({
			title: this.translate.instant('ITEM.' + action.toUpperCase(), { itemName: itemName }),
			description: this.translate.instant('ITEM.ARE_YOU_SURE_' + action.toUpperCase()),
			actions: [{ label: this.translate.instant('BUTTONS.' + action.toUpperCase()), id: 1 }]
		});

		return this.openDialog(dialogData);
	}

	launchDialogMultiple(totalSelected: number, action: ConfirmAction): Observable<MatDialogRef<any>> {
		const dialogData = dialogSimpleFactory({
			title: this.translate.instant('ITEMS.' + action),
			description: this.translate.instant('ITEMS.ARE_YOU_SURE_' + action, { totalSelected: totalSelected }),
			actions: [{ label: this.translate.instant('BUTTONS.' + action), id: 1 }]
		});

		return this.openDialog(dialogData);
	}

}
