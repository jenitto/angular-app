import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawgEndpointsEnum } from 'src/app/core/interfaces/rawg.config';
import { RouteParams } from 'src/app/core/interfaces/route.interface';
import { HttpClientService } from 'src/app/core/services/http-client.service';

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

	// getItem(id: string, params: RouteParams = {}): Observable<Catalogue> {
	// 	return this.http.get({
	// 		routeName: 'api_catalogues_get_item',
	// 		params: { ...params, id }
	// 	});
	// }

	// moveItem(id: string, parent: string): Observable<Unit> {
	// 	const payload: RouteParams = { parent };

	// 	return this.http.put<Unit>(
	// 		{ routeName: 'api_catalogues_put_item', params: { id } },
	// 		payload
	// 	);
	// }

	// moveItems(ids: string[], parent: string): Observable<(Unit | Folder)[]> {
	// 	const httpCalls: Observable<any>[] = [];
	// 	const payload: RouteParams = { parent };

	// 	ids.forEach((id: string) => {
	// 		httpCalls.push(
	// 			this.http.put<(Unit | Folder)>(
	// 				{ routeName: 'api_catalogues_put_item', params: { id } },
	// 				payload,
	// 				{ headers: BatchService.HEADERS_CONTENT_TYPE_BATCH }
	// 			)
	// 		);
	// 	});

	// 	return forkJoin(httpCalls);
	// }

	// archiveItem(id: string): Observable<void> {
	// 	return this.http.patch<void>(
	// 		{ routeName: 'api_catalogues_archive_item', params: { id } },
	// 		{}
	// 	);
	// }

	// deleteItem(id: string): Observable<void> {
	// 	return this.http.delete<void>({
	// 		routeName: 'api_catalogues_delete_item',
	// 		params: { id }
	// 	});
	// }

	// deleteItems(ids: string[]): Observable<any[]> {
	// 	const httpCalls: Observable<any>[] = [];

	// 	ids.forEach((id: string) => {
	// 		httpCalls.push(
	// 			this.http.delete(
	// 				{ routeName: 'api_catalogues_delete_item', params: { id } },
	// 				{ headers: BatchService.HEADERS_CONTENT_TYPE_BATCH }
	// 			)
	// 		);
	// 	});

	// 	return forkJoin(httpCalls);
	// }

	// restoreItem(id: string): Observable<Catalogue> {
	// 	return this.http.patch<Catalogue>(
	// 		{ routeName: 'api_catalogues_unarchive_item', params: { id } },
	// 		{}
	// 	);
	// }

	// restoreItems(ids: string[]): Observable<any> {
	// 	const httpCalls: Observable<any>[] = [];

	// 	ids.forEach((id: string) => {
	// 		httpCalls.push(
	// 			this.http.patch(
	// 				{ routeName: 'api_catalogues_unarchive_item', params: { id } },
	// 				null,
	// 				{ headers: BatchService.HEADERS_CONTENT_TYPE_BATCH }
	// 			)
	// 		);
	// 	});

	// 	return forkJoin(httpCalls);
	// }

	// update(id: string, update: any) {
	// 	return this.http.put(
	// 		{ routeName: 'api_catalogues_put_item', params: { id } },
	// 		update
	// 	);
	// }

}
