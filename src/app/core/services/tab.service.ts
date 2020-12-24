import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from 'src/app/core/components/navbar/components/nav-tabs/tab.interface';

@Injectable({
	providedIn: 'root'
})
export class TabService {

	private tabsSource = this.getRootTabs();

	tabs$ = new BehaviorSubject<Tab[]>(this.tabsSource);

	constructor() { }

	public changeTabs(tabs: Tab[]): void {
		this.tabsSource = tabs;
		this.tabs$.next(this.tabsSource);
	}

	public updateTabs(): void {
		this.tabs$.next(this.tabsSource);
	}

	public getRootTabs(): Tab[] {
		return [
			{
				title: 'TABS.PLATFORMS',
				route: '/'
			},
			{
				title: 'TABS.GAMES',
				route: '/games'
			},
			{
				title: 'TABS.UNKNOWN',
				route: '/reports',
			}
		];
	}

}
