
export interface RouteParams {
	key?: string | string[];
	id?: string | string[];
	page?: number;
	page_size?: number;
	ordering?: string;
	search?: string;
	search_exact?: boolean;
	platforms?: string;
	dates?: string;
}
