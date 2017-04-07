// import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';

import { AppComponent }         from './components/app';

import { PeopleComponent }   from './components/people/people.component';
// import { PeopleListComponent }   from './components/peoplelist/peoplelist.component';

import { Tab }   from './directives/tab/tab';
import { Tabs }   from './directives/tab/tabs';
import { PeopleList }   from './directives/peopleList/people-list';
import { AdvancedSearch }   from './directives/advancedsearch/advanced-search';

import { Config }   from './services/config';
import { API }   from './services/api';

import { ScrollerDirective } from './directives/scroller';

import { I18nDirective } from './directives/language';
import { I18nAttrDirective } from './directives/language';
import { TranslateService } from './directives/language';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		CommonModule,
		FormsModule,
		RouterModule.forRoot([
			{
				path: '',
				redirectTo: '/people/mediatype',
				pathMatch: 'full'
			},
			{
				path: 'people/:type',
				component: PeopleComponent,
				// children: [
				// 	{ path: '', }
				// 	{ path: ':id', component: PeopleComponent }
				// ]
			},
			// {
			// 	path: 'people/:type',
			// 	redirectTo: '/people/:type/1',
			// 	pathMatch: 'full'
			// },
			{
				path: 'people/:type/:id',
				component: PeopleComponent,
			}
		])
	],
	declarations: [
		AppComponent,
		PeopleComponent,
		// PeopleListComponent,
		Tab,
		Tabs,
		PeopleList,
		AdvancedSearch,
		ScrollerDirective,
		I18nDirective,
		I18nAttrDirective
	],
	providers: [
		Config,
		API,
		TranslateService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }