import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabNav } from '@angular/material/tabs';
import { Tab } from 'src/app/core/components/navbar/components/nav-tabs/tab.interface';
import { TabService } from 'src/app/core/services/tab.service';

@Component({
	selector: 'app-nav-tabs',
	templateUrl: './nav-tabs.component.html',
	styleUrls: ['./nav-tabs.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NavTabsComponent implements OnInit {

	@ViewChild('matTabs', { static: true }) matTabs: MatTabNav;

	public tabs: Tab[] = [];

	constructor(
		private tabService: TabService,
	) { }

	ngOnInit(): void {
		this.listenOnTabsChange();
	}

	listenOnTabsChange(): void {
		this.tabService.tabs$.subscribe((tabs: Tab[]) => {
			this.tabs = tabs;
		});
	}

}
