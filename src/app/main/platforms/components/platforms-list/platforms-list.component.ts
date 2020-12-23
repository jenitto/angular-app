import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Platform } from 'src/app/shared/lib/interfaces/rawg/platform.interface';

@Component({
	selector: 'app-platforms-list',
	templateUrl: './platforms-list.component.html',
	styleUrls: ['./platforms-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformsListComponent {

	@Input() platforms: Platform[];
	@Input() skeletons: any[];

	@Output() deletePlatform = new EventEmitter<Platform>();
	@Output() editPlatform = new EventEmitter<Platform>();
	@Output() goToPlatform = new EventEmitter<Platform>();

	trackByFn(index: number, item: Platform): string | number {
		return item ? item.id : index;
	}
}
