import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-searcher',
	templateUrl: './searcher.component.html',
	styleUrls: ['./searcher.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SearcherComponent implements OnInit {

	@Input() color: 'light' | 'dark' = 'light';
	@Input() disable = false;
	@Input() hideUnderline = false;
	@Input() debounceTime = 100;

	@Output() changeSearch = new EventEmitter<string>();
	@Output() submitSearch = new EventEmitter<string>();
	@Output() closeSearcher = new EventEmitter<void>();

	public searchForm: FormGroup;
	public showSearchBar = false;

	private previousValue: string;

	constructor(
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.createForm();
	}

	createForm(): void {
		this.searchForm = this.fb.group({
			term: ['']
		});
		this.listenToSearchInputChanges();
	}

	listenToSearchInputChanges(): void {
		this.searchForm
			.get('term')
			.valueChanges
			.pipe(
				debounceTime(this.debounceTime),
				map((term: string) => term.trim()),
				filter(() => this.showSearchBar),
				distinctUntilChanged(),
			).subscribe((term: string) => {
				this.changeSearch.emit(term);
			});
	}

	onSubmit(): void {
		const term = this.searchForm.get('term').value.trim();

		if (term !== this.previousValue) {
			this.submitSearch.emit(term);
			this.previousValue = term;
		}
	}

	toggleSearchBar(): void {
		this.showSearchBar = !this.showSearchBar;
		if (!this.showSearchBar) {
			this.closeSearcher.emit();
			this.searchForm.setValue({ term: '' });
			this.previousValue = undefined;
		}
	}

}
