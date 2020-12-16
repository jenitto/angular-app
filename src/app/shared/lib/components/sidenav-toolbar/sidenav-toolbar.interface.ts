export interface SidenavToolbarAction {
	label: string;
	method: string | Function;
	disabled?: boolean;
	hide?: boolean;
}
