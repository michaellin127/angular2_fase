import { Component, ContentChildren, EventEmitter, Output, QueryList, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tab } from './tab';

@Component({
  selector: 'tabs',
  styles: [`
    .faselis-tab{
      border: 0px;
    }
    .faselis-tab li a{
      background-color: rgb(220,227,230);
      color: rgb(58,49,66);
    }
    .faselis-tab li.active a{
      background-color: rgb(0,200,195);
      color: rgb(255,255,255);
      
    }
  `],
  template:`
    <ul class="nav nav-tabs faselis-tab">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a>{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs implements AfterContentInit {
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  // @Output()
  // changedTab:EventEmitter<string> = new EventEmitter();
  // contentChildren are set

  constructor(private router: Router) {

  }
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);
    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  selectTab(tab: Tab) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    // activate the tab the user has clicked on.
    tab.active = true;
    this.router.navigateByUrl(tab.href);
  }
}