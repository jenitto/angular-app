import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

	static integerValidator: ValidatorFn
		= (control: AbstractControl): { [key: string]: any } | null => {
			return (control.value && !Number.isInteger(control.value)) ?
				{ 'invalidInteger': true } :
				null;
		}

	static minValueTrimValidator(num: number): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const value = control.value;

			if (value == null || value.length === 0) {
				return null;  // don't validate empty values to allow optional controls
			}

			const trimLength = (value || '').trim().length;
			return trimLength < num ? { 'mintrimlength': true } : null;
		};
	}

	static numberValidator: ValidatorFn
		= (control: AbstractControl): { [key: string]: any } | null => {
			return CustomValidators.validateNumber(control, /^[-+]?([\,\.]\d+|\d+[\,\.]?\d*)$/, 'number');
		}

	static positiveNumberValidator: ValidatorFn
		= (control: AbstractControl): { [key: string]: any } | null => {
			const pattern = /^[+]?([\,\.]\d+|\d+[\,\.]?\d*)$/;
			if (!control.value || control.value === null) {
				return null;
			} else {
				return !pattern.test(control.value) ?
					{ 'positiveNumber': true } :
					null;
			}
		}

	private static validateNumber(control: AbstractControl, pattern: RegExp, key: string): { [key: string]: any } | null {
		return control.value !== null && control.value !== '' &&
			typeof control.value.trim === 'function' && !pattern.test(control.value.trim()) ?
			{ key: true } :
			null;
	}

	static compareFormGroup(initialFormGroup: FormGroup): ValidatorFn {
		return (group: FormGroup): ValidationErrors => {
			if (JSON.stringify(group.value) === JSON.stringify(initialFormGroup.value)) {
				return { equivalent: true };
			} else {
				return null;
			}
		};
	}

	static urlValidator: ValidatorFn
		= (control: AbstractControl): { [key: string]: any } | null => {
			const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
			if (!control.value || control.value === null) {
				return null;
			} else {
				return !pattern.test(control.value) ?
					{ 'url': true } :
					null;
			}
		}

}
