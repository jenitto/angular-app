export interface DialogInputInterface {
	title: string;
	action: string;
	inputText?: string;
	placeholder?: string;
	selectText?: boolean;
	focus?: boolean;
	minLength?: number;
	maxLength?: number;
	isEdit?: boolean;
}
