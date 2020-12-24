import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/core/validators/custom-validators';
import { DialogInputInterface } from 'src/app/shared/lib/components/dialogs/dialog-input/dialog-input.interface';

@Component({
	selector: 'app-dialog-input',
	templateUrl: './dialog-input.component.html',
	styleUrls: ['./dialog-input.component.scss']
})
export class DialogInputComponent implements OnInit {

	@ViewChild('inputDialog', { static: true }) inputDialog: ElementRef;

	public formDialog: FormGroup;
	public selectText = false;

	constructor(
		public dialogRef: MatDialogRef<DialogInputComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogInputInterface,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.createForm();
		this.checkIfSelectText();
	}

	checkIfSelectText(): void {
		if (this.data.selectText) {
			this.selectText = true;
		}
	}

	createForm(): void {
		if (this.data.inputText) {
			this.formDialog = this.fb.group({
				inputText: [this.data.inputText, Validators.required]
			});
		} else {
			this.formDialog = this.fb.group({
				inputText: ['', Validators.required]
			});
		}

		if (this.data.minLength && this.data.maxLength) {
			this.formDialog.controls['inputText'].setValidators([
				Validators.required,
				CustomValidators.minValueTrimValidator(this.data.minLength),
				Validators.maxLength(this.data.maxLength)
			]);
		}

		if (this.data.isEdit) {
			this.validateCheckDifferences();
		}
	}

	validateCheckDifferences(): void {
		const initialFormGroup: FormGroup = Object.assign({}, this.formDialog);
		this.formDialog.setValidators(CustomValidators.compareFormGroup(initialFormGroup));
		this.formDialog.updateValueAndValidity();
	}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onCloseWithText(): void {
		if (this.formDialog.valid) {
			this.dialogRef.close({ text: this.text.trim() });
		}
	}

	get text(): string {
		return this.formDialog.get('inputText').value;
	}
}
