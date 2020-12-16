import { MatDialogConfig } from '@angular/material/dialog';
import { DialogSimpleData } from 'src/app/shared/lib/components/dialogs/dialog-simple/dialog-simple-data.interface';

export function dialogSimpleFactory(data: DialogSimpleData): MatDialogConfig {
	const dialogConfig = new MatDialogConfig();

	data.textAlign = data.textAlign ? data.textAlign : 'left';

	dialogConfig.width = '560px';
	dialogConfig.data = data;
	dialogConfig.autoFocus = data.autoFocus;
	dialogConfig.disableClose = data.disableClose;

	return dialogConfig;
}
