import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { RawgEndpointsEnum } from 'src/app/core/interfaces/rawg.config';
import { RouteParams } from 'src/app/core/interfaces/route.interface';
import { HttpClientService } from 'src/app/core/services/http-client.service';
import { Game } from 'src/app/shared/lib/interfaces/rawg/game.interface';

@Injectable({
	providedIn: 'root'
})
export class GamesService {

	constructor(
		private http: HttpClientService
	) { }

	getItems(params: RouteParams = {}): Observable<any> {
		return this.http.get(RawgEndpointsEnum.GAMES, params);
	}

	postItem(gamePostData: any, cover?: File): Observable<Game> {
		// return this.http.post(RawgEndpointsEnum.GAMES, gamePostData);
		return of(gamePostData).pipe(delay(200));

	}

	updateItem(gamePostData: any, cover?: File): Observable<Game> {
		// return this.http.put(RawgEndpointsEnum.GAMES, {params: { id: game.id }}, gamePostData);
		return of(gamePostData).pipe(delay(200));
	}

	deleteItem(id: string): Observable<string> {
		// return this.http.delete(RawgEndpointsEnum.GAMES, {params: { id }});
		return of(id).pipe(delay(200));
	}

}
