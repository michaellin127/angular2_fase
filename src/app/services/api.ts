import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from './config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class API {
	private http: Http;
	private config: Config;
	constructor(http: Http, config: Config) {
		this.http = http;
		this.config = config;
	}
	createAuthorizationHeader() :Headers {
		let headers:Headers = new Headers();
		headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return headers;
	}

	/**
	 *Create url
	 * url pattern ":action/:param/:id/:extra/:add/:last"
	*/
	private getURL1(data: any) :string {
		let url:string = "";
		if (data.param !== undefined) {
			url += "/" + data.param;
		}
		if (data.id !== undefined) {
			url += "/" + data.id;
		}
		if (data.extra !== undefined) {
			url += "/" + data.extra;
		}
		if (data.add !== undefined) {
			url += "/" + data.add;
		}
		return url;
	}

	/** 
	 * Create url
	 * url pattern ":action/:id/:param/:extra/:add/:last"
	*/
	private getURL2(data: any) :string {
		let url:string = "";
		if (data.id !== undefined) {
			url += "/" + data.id;
		}
		if (data.param !== undefined) {
			url += "/" + data.param;
		}
		if (data.extra !== undefined) {
			url += "/" + data.extra;
		}
		if (data.add !== undefined) {
			url += "/" + data.add;
		}
		if (data.last !== undefined) {
			url += "/" + data.last;
		}
		return url;
	}

	/**
		Get params for GET Method
	*/
	private getParam(data:any) :string {
		let param:string = "";
		var arr = Object.keys(data).map(function(k) {
			return [k, data[k]];
		});
		arr.forEach(obj => {
			param += (param === "") ? "?" : "&";
			param += obj[0] + "=" + obj[1];
		});
		return param;
	}
	// getPeople(data:any, callback) {
	getPeople(data:any): Promise<any> {
		let url:string = this.getURL1(data);
		let param:string = this.getParam(data);
		let headers:Headers = this.createAuthorizationHeader();
		return this.http.get(this.config.api.base + this.config.api.version + '/people' + url + param, {
			headers: headers
		})
		.toPromise()
		.then(res => res.json());
		// .then(res => {
		// 	callback(res.json());
		// });
	}

	/*Filter*/
	// getFilter(data:any, callback){
	getFilter(data:any): Promise<any> {
		let url:string = this.getURL1(data);
		let param:string = this.getParam(data);
		let headers:Headers = this.createAuthorizationHeader();
		return this.http.get(this.config.api.base + this.config.api.version + '/filter' + url + param, {
			headers: headers
		})
		.toPromise()
		.then(res => res.json());
	}

	// post(data:any, callback) {
	// 	let headers = this.createAuthorizationHeader();
	// 	let url = this.config.api.base + this.config.api.version + url;
	// 	return this.http.post(full_url, data, {
	// 		headers: headers
	// 	});
	// }
	// get(data:any, callback) {
	// 	let headers:Headers = this.createAuthorizationHeader();
	// 	if (param === undefined) {
	// 		param = '';
	// 	}
	// 	let url = this.config.api.base + this.config.api.version + url + param;
	// 	return this.http.get(full_url, {
	// 		headers: headers
	// 	});
	// }

	/**
	 * Translate
	 */
	// getTranslate(): Promise<any> {
	// 	let url:string = this.getURL1(data);
	// 	let param:string = this.getParam(data);
	// 	let headers:Headers = this.createAuthorizationHeader();
	// 	return this.http.get(this.config.api.base + this.config.api.version + '/filter' + url + param, {
	// 		headers: headers
	// 	})
	// 	.toPromise()
	// 	.then(res => res.json());
	// }
}