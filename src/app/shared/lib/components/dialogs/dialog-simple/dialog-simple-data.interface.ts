export interface DialogAction {
	label: string;
	id: number;
}

export interface DialogSimpleData {
	title: string;
	subtitle?: string;
	description?: string;
	placeholder?: string;
	icon?: string;
	textAlign?: 'left' | 'center';
	showCancelButton?: boolean;
	actions?: DialogAction[];
	autoFocus?: boolean;
	disableClose?: boolean;
}
