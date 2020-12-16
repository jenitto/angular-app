import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GlobalLoadingService {

	private loadingCount = 0;

	private loadingSource = new BehaviorSubject<number>(this.loadingCount);
	public loading$ = this.loadingSource.asObservable();

	incrementLoader(): void {
		this.loadingCount++;
		this.emitLoader();
	}

	decrementLoader(): void {
		if (this.loadingCount > 0) {
			this.loadingCount--;
			this.emitLoader();
		}
	}

	resetLoader(): void {
		this.loadingCount = 0;
		this.emitLoader();
	}

	isLoading(): boolean {
		return !!this.loadingCount;
	}

	private emitLoader(): void {
		this.loadingSource.next(this.loadingCount);
	}
}
