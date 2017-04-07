import { Component, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { NgModel } from "@angular/forms";
@Component({
	moduleId: module.id,
	selector: 'people-list',
	templateUrl: 'people-list.html',
	styleUrls: ['people-list.css'],
})

export class PeopleList {
	@Input() lists: any = [];
	@Output()
  	onNext:EventEmitter<string> = new EventEmitter();

    next() {
        this.onNext.emit();
    }
}