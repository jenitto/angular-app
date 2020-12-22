export interface MenuButton {
	title: string;
	icon: string;
	show: boolean;
	disabled: boolean;
	method: Function;
	link?: LinkParams;
	color?: string;
	backgroundColor?: string;
}

export interface LinkParams {
	routerLink?: string[];
	queryParams?: {};
	target?: string;
}
