import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { RawgEndpointsEnum } from 'src/app/core/interfaces/rawg.config';
import { RouteParams } from 'src/app/core/interfaces/route.interface';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { Platform } from 'src/app/shared/lib/interfaces/rawg/platform.interface';
@Injectable({
	providedIn: 'root'
})
export class PlatformsService {

	constructor(
		private http: HttpClientService
	) { }

	getItems(params: RouteParams = {}): Observable<any> {
		return this.http.get(RawgEndpointsEnum.PLATFORMS, params);
	}

	postItem(platformPostData: any, cover?: File): Observable<Platform> {
		// return this.http.post(RawgEndpointsEnum.PLATFORMS, platformPostData);
		return of(platformPostData).pipe(delay(200));

	}

	updateItem(platformPostData: any, cover?: File): Observable<Platform> {
		// return this.http.put(RawgEndpointsEnum.PLATFORMS, {params: { id: platform.id }}, platformPostData);
		return of(platformPostData).pipe(delay(200));
	}

	deleteItem(id: string): Observable<string> {
		// return this.http.delete(RawgEndpointsEnum.PLATFORMS, {params: { id }});
		return of(id).pipe(delay(200));
	}

}
