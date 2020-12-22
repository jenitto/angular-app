import { Game } from 'src/app/shared/lib/interfaces/rawg/game.interface';
import { Platform } from 'src/app/shared/lib/interfaces/rawg/platform.interface';

export interface RawgAPIRes {
	count: number;
	next: string;
	previous?: any;
	results: Platform[] | Game[];
	seo_title?: string;
	seo_description?: string;
	seo_keywords?: string;
	seo_h1?: string;
	noindex?: boolean;
	nofollow?: boolean;
	description?: string;
	filters?: any;
	nofollow_collections?: string[];
}