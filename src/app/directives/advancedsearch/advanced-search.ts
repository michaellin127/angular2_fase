import { Component, EventEmitter, Output, Input, HostListener, OnChanges } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'advanced-search',
	templateUrl: 'advanced-search.html',
	// styleUrls: ['advanced-search.css']
})

export class AdvancedSearch {

	@Output()
	onSearch:EventEmitter<string> = new EventEmitter();

	private keywords: any = {};

	search(keywords:any) {
		this.keywords = keywords;
		this.onSearch.emit(this.keywords);
	}
}