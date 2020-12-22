import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Platform } from 'src/app/shared/lib/interfaces/rawg/platform.interface';

@Component({
	selector: 'app-card-platform',
	templateUrl: './card-platform.component.html',
	styleUrls: ['./card-platform.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardPlatformComponent {

	@Input() platform: Platform;

	@Output() goToPlatform = new EventEmitter<Platform>();
	@Output() selectedChange = new EventEmitter<Platform>();
	@Output() deletePlatform = new EventEmitter<Platform>();
	@Output() editPlatform = new EventEmitter<Platform>();

}
