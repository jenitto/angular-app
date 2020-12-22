export interface Platform {
	id: string;
	name: string;
	slug: string;
	games_count: number;
	image_background?: string;
	image?: any;
	year_start?: number;
	year_end?: any;
	games: PlatformGame[];
}

export interface PlatformGame {
	id: number;
	slug: string;
	name: string;
	added: number;
}