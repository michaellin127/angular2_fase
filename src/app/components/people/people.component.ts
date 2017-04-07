import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
// import { PeopleService } from './people.service';
import { API } from '../../services/api';

@Component({
	moduleId: module.id,
	selector: 'people-container',
	templateUrl: 'people.component.html',
	styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {

	private sub: any = {};
	private media_categories: any = [];
	private subject_categories: any = [];
	private peoples: any = [];
	private scroller: boolean = false;
	private request: any = {
		param: null,
		id: null,
		limit: 10,
		page: 1
	};
	constructor(private api: API, private router: Router, private route: ActivatedRoute) {
		console.log('constructor');
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			if (params['type'] === 'advanced-search') {
				this.request.param = 'searchByKeyword';
				this.request.id = '';
				// this.categories = [];
				this.peoples = [];
			} else {
				this.request.param = params['type'];
				this.request.id = +params['id'];
				this.request.page = 1;
				if ((this.request.param === 'mediatype' && this.media_categories.length > 0) || (this.request.param === 'subject' && this.subject_categories.length > 0)) {
					this.getPeoples(this.request);
				} else {
					this.getCategories();
				}
			}
		});
		// this.sub = this.router.events.subscribe((event) => {
		// 	console.log(event);
		// 	if (event instanceof NavigationEnd) {
		// 		if (this.route.snapshot.params.type === 'advanced-search') {
		// 			this.request.param = 'searchByKeyword';
		// 			this.request.id = '';
		// 			// this.categories = [];
		// 			this.peoples = [];
		// 		} else {
		// 			this.request.param = this.route.snapshot.params.type;
		// 			this.request.id = this.route.snapshot.params.id;
		// 			this.request.page = 1;
		// 			if ((this.request.param === 'mediatype' && this.media_categories.length > 0) || (this.request.param === 'subject' && this.subject_categories.length > 0)) {
		// 				this.getPeoples(this.request);
		// 			} else {
		// 				this.getCategories();
		// 			}
		// 		}
		// 	}
		// });
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	//Call when click category list
	setCategory(event:any) {
		this.request.id = event;
		let url:string = '/people/' + this.request.param + '/' + this.request.id;
		this.router.navigateByUrl(url);
	}

	//Get category list by Filter Type
	getCategories() {
		let req:any = {param : this.request.param};
		this.api.getFilter(req)
		.then(res => {
			if (res.status.code === 200) {
				this.request.param === 'mediatype' ? this.media_categories = res.result : this.subject_categories = res.result;
				if (this.request.id === undefined || this.request.id === null) {
					this.peoples = [];
				} else {
					this.getPeoples(this.request);
				}
			}
		});
	}

	//Call when scroll down
	next() {
		this.request.page = this.peoples.paging.page + 1;
		this.getPeoples(this.request);
	}

	// Get peoples list
	getPeoples(req:any) {
		let totalPages: number = (this.peoples.paging !== undefined) ? this.peoples.paging.totalPages : 100;
		if (!this.scroller && req.id !== undefined && req.page <= totalPages) {
			this.scroller = true;
			this.api.getPeople(req)
			.then(res => {
				if (req.page === 1) {
					this.peoples = res.result;
				} else {
					let tmp: any = this.peoples;
					tmp.people = tmp.people.concat(res.result.people);
					tmp.paging = res.result.paging;
					tmp.sql = tmp.sql.concat(res.result.sql);
					this.peoples = tmp;
				}
				this.scroller = false;
			});
		}
	}

	search(event:any) {
		let req:any = {};
		this.request.page = 1;
		Object.assign(req, event, this.request);
		this.getPeoples(req);
	}
}