import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawgEndpointsEnum, RAWG_API_KEY, RAWG_BASE_URL } from 'src/app/core/interfaces/rawg.config';
import { RouteParams } from 'src/app/core/interfaces/route.interface';

@Injectable({
	providedIn: 'root'
})
export class HttpClientService {

	constructor(
		private http: HttpClient,
	) { }

	get<T>(route: RawgEndpointsEnum, options: RouteParams): Observable<T> {
		return this.http.get<T>(this.getUrl(route), {
			params: { key: RAWG_API_KEY },
		});
	}

	post<T>(route: RawgEndpointsEnum, data: object): Observable<T> {
		return this.http.post<T>(this.getUrl(route), data);
	}

	put<T>(route: RawgEndpointsEnum, data: object): Observable<T> {
		return this.http.put<T>(this.getUrl(route), data);
	}

	patch<T>(route: RawgEndpointsEnum, data: object): Observable<T> {
		return this.http.patch<T>(this.getUrl(route), data);
	}

	delete<T>(route: RawgEndpointsEnum): Observable<T> {
		return this.http.delete<T>(this.getUrl(route));
	}

	private getUrl(route: RawgEndpointsEnum): string {
		return RAWG_BASE_URL + route;
	}

	private getParams(options: RouteParams): RouteParams {
		return {
			key: RAWG_API_KEY
		};
	}

}
