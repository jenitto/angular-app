import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TrimBodyInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let newBody;
		if (this.checkIfPutOrPostMethod(req)
			&& req.body && !this.checkIfHaveFormData(req)) {
			newBody = { ...req.body };
			Object.keys(newBody).forEach((key) => {
				newBody[key] = typeof newBody[key] === 'string' ? newBody[key].trim() : newBody[key];
			});

		}

		return next.handle(req.clone({ body: newBody ? newBody : req.body }));
	}

	checkIfPutOrPostMethod(req: HttpRequest<any>): boolean {
		return req.method.toLocaleLowerCase() === 'put' || req.method.toLocaleLowerCase() === 'post';
	}

	checkIfHaveFormData(req: HttpRequest<any>): boolean {
		return req.body instanceof FormData;
	}

	// trimObjectValues(obj: Object): void {
	// 	Object.keys(obj).forEach((key: string) => {
	// 		const value = obj[key];

	// 		if (value instanceof Object) {
	// 			this.trimObjectValues(value);
	// 		} else {
	// 			if (typeof (value.value) === 'string') {
	// 				value.setValue(value.value.trim());
	// 			}
	// 		}
	// 	});
	// }

}
