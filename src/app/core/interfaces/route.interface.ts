
export interface RouteParams {
	key?: string | string[];
	id?: string | string[];
	page?: number;
	page_size?: number;
	ordering?: string | OrderingEnum;
}

export enum OrderingEnum {
	NAME = 'name',
	NAME_REVERSE = '-name',
}