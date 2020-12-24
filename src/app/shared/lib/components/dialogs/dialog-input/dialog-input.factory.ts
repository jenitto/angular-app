import { MatDialogConfig } from '@angular/material/dialog';

export function dialogInputFactory(data: any): MatDialogConfig {
	const dialogConfig = new MatDialogConfig();

	// dialogConfig.autoFocus = false;
	dialogConfig.width = '560px';
	dialogConfig.data = data;

	return dialogConfig;
}
