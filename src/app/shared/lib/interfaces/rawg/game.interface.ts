export interface Game {
	id: string;
	slug: string;
	name: string;
	released: string;
	tba: boolean;
	background_image: string;
	rating: number;
	rating_top: number;
	ratings: Rating[];
	ratings_count: number;
	reviews_text_count: number;
	added: number;
	added_by_status: any;
	metacritic: number;
	playtime: number;
	suggestions_count: number;
	updated: string;
	user_game?: any;
	reviews_count: number;
	saturated_color: string;
	dominant_color: string;
	platforms: GamePlatforms[];
	parent_platforms: GamePlatforms[];
	genres: Genre[];
	stores: Store[];
	clip?: any;
	tags: Tag[];
	esrb_rating?: any;
	short_screenshots: Shortscreenshot[];
}

interface Shortscreenshot {
	id: number;
	image: string;
}

interface Rating {
	id: number;
	title: string;
	count: number;
	percent: number;
}

interface Genre {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
}

interface Store {
	id: number;
	name: string;
	slug: string;
	domain: string;
	games_count: number;
	image_background: string;
}

interface Tag {
	id: number;
	name: string;
	slug: string;
	language: string;
	games_count: number;
	image_background: string;
}

interface GamePlatforms {
	platform: GamePlatform;
}

interface GamePlatform {
	id: number;
	name: string;
	slug: string;
	image?: any;
	year_end?: any;
	year_start?: (null | number)[];
	games_count: number;
	image_background: string;
}
