export interface RouteParams {
	key?: string;
	id?: string | string[];
	page?: number;
	itemsPerPage?: number;
	order?: {
		name?: string;
		updatedAt?: string;
		archivedAt?: string;
		usedDisk?: string;
		totalUnits?: string;
		descendantAmount?: string;
	};
}

export interface RouteInterface {
	routeName: string;
	params?: RouteParams;
}