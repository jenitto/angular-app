import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { finalize, tap } from 'rxjs/operators';
import { PlatformsService } from 'src/app/core/services/platforms.service';
import { SIDENAVDATA, SidenavService } from 'src/app/core/services/sidenav.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { SidenavToolbarAction } from 'src/app/shared/lib/components/sidenav-toolbar/sidenav-toolbar.interface';
import { Platform } from 'src/app/shared/lib/interfaces/rawg/platform.interface';

@Component({
	selector: 'app-new-platform',
	templateUrl: './new-platform.component.html',
	styleUrls: ['./new-platform.component.scss']
})
export class NewPlatformComponent implements OnInit {

	public platformForm: FormGroup;
	public isLoading = false;

	public hasCover = false;
	public toolbarActions: SidenavToolbarAction[];

	@Output() newPlatform = new EventEmitter<Platform>();
	@Output() updatePlatform = new EventEmitter<Platform>();

	constructor(
		@Optional() @Inject(SIDENAVDATA) public platform: Platform,
		private sidenavService: SidenavService,
		private fb: FormBuilder,
		private translate: TranslateService,
		private platformService: PlatformsService,
	) { }

	ngOnInit(): void {
		this.buildForm();
		this.platformForm.valueChanges.subscribe(() => this.refreshToolbarActions());
		this.refreshToolbarActions();
	}

	buildForm(): void {
		const projectName = this.platform ? this.platform.name : '';

		this.platformForm = this.fb.group({
			name: [projectName,
				[
					Validators.required,
					Validators.maxLength(255),
					CustomValidators.minValueTrimValidator(3)
				]
			],
		});

		const initialFormGroup: FormGroup = Object.assign({}, this.platformForm);
		this.platformForm.setValidators(CustomValidators.compareFormGroup(initialFormGroup));
		this.platformForm.updateValueAndValidity();

		if (!this.platform) {
			this.initDummyData();
		}
	}

	private initDummyData(): void {
		this.platformForm.get('name').setValue(this.translate.instant('NEW_PLATFORM.NEW_PLATFORM'));
	}

	refreshToolbarActions(): void {
		this.toolbarActions = [
			{
				label: this.translate.instant('BUTTONS.SAVE'),
				method: () => this.onSubmitPlatform(),
				disabled: !this.platformForm.valid || this.isLoading
			}
		];
	}

	onSubmitPlatform(): void {
		const platformData = {
			...this.platform,
			name: this.platformForm.get('name').value,
		};

		this.isLoading = true;
		this.toolbarActions[0].disabled = true;

		let method;
		if (this.platform) {
			method = 'updateItem';
		} else {
			method = 'postItem';
		}

		this.platformService[method](platformData).pipe(
			tap((res: Platform) => {
				if (this.platform) {
					this.updatePlatform.emit({ id: this.platform.id, ...res });
				}
				else {
					this.newPlatform.emit(res);
				}
			}),
			finalize(() => {
				this.isLoading = false;
				this.onCloseSidenav();
			})
		).subscribe();

	}

	onCloseSidenav(): void {
		this.sidenavService.close();
	}

}
