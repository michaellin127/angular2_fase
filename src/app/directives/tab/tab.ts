import { Component, Input } from '@angular/core';

@Component({
  selector: 'tab',
  styles: [`
    .pane{
      width: calc(100% - 5px);
      padding: 1em;
      overflow-x: hidden;
      overflow-y: auto;
      position: absolute;
      top: 43px;
      bottom: 0px;
      border-right: 5px solid rgb(234,234,234);
    }
  `],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
  @Input('tabTitle') title: string;
  @Input('tabHref') href: string;
  @Input('tabActive') active: boolean;
  // @Input() active = false;
}