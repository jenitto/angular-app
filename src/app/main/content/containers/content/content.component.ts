import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.scss'],
	providers: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
	ngOnInit() {
		console.log('Hola mundo!');
	}
}
