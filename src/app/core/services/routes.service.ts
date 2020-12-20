import { Injectable } from '@angular/core';
import { RouteInterface } from 'src/app/shared/interfaces/route.interface';
import Routing from 'src/assets/js/router.min.js';

@Injectable({
	providedIn: 'root'
})
export class RoutesService {

	public routing;

	constructor() {
		this.routing = Routing;
	}

	public generate(route: RouteInterface) {
		return this.routing.generate(route.routeName, route.params, route.absolute);
	}

}
