import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Sort } from '@angular/material/sort';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SelectComponent {

	@Input() options: Array<Sort>;
	@Input() placeholder: string;
	@Input() formClass: string | string[] | Set<string> | { [key: string]: any };
	@Input() panelClass: string | string[] | Set<string> | { [key: string]: any } = 'custom-panel-select';
	@Input() value: Sort;
	@Input() multiple = false;
	@Input() disabled = false;
	@Input() translateKeyPrefix = '';

	@Output() selectionChange: EventEmitter<Sort> = new EventEmitter();

	compareSort(sort1: Sort, sort2: Sort): boolean {
		return sort1 && sort2
			? (sort1.active === sort2.active && sort1.direction === sort2.direction)
			: sort1 === sort2;
	}

	public onSelectionChange(selectChange: MatSelectChange): void {
		this.selectionChange.emit(selectChange.value);
	}
}
