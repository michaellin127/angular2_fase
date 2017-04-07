import { Directive, ElementRef, Input, Injectable, HostListener, DoCheck } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from '../services/config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TranslateService {
	private http: Http;
	private config: Config;
	private uri: string = "";

	public source: any = [];
	public isload: boolean = false;

	constructor(http: Http, config: Config) {
		this.http = http;
		this.config = config;
		this.uri = this.config.api.base + this.config.api.version + '/translation/';
		this.initTranslate();
	}
	getTranslate(key:string) {
		let find:string = "";
		if (this.source.length > 0 && this.isload) {
			this.source.forEach((obj: any) => {
				if (obj.key === key) {
					find = obj.value;
				}
			});
		}
		return (find !== "") ? find : key;
	}
	setLanguage(val:string) {
		this.uri = this.config.api.base + this.config.api.version + '/translation/';
		this.initTranslate();
	}
	initTranslate() {
		this.isload = false;
		this.http.get(this.uri, {})
		.toPromise()
		.then(res => {
			this.source = res.json();
			this.isload = true;
		});
	}
}

@Directive({ selector: '[i18n]' })
export class I18nDirective implements DoCheck {
	@Input()
		i18n: string;

	private element: ElementRef;
	private translate: TranslateService;
	private isload: boolean = false;

	constructor(el:ElementRef, translate:TranslateService) {
		this.translate = translate;
		this.isload = this.translate.isload;
		this.element = el;
	}

	ngDoCheck() {
		if (this.isload !== this.translate.isload) {
			this.update();
			this.isload = this.translate.isload;
		}
	}

	update() {
		var val:any = this.i18n.split('|');
		var el = this.element.nativeElement;
		if (val.length > 0) {
			var result:string = this.translate.getTranslate(val[0]);
			if (result !== undefined && result !== "") {
				if (val.length > 1) {
					val.forEach((n, key) => {
						if (key > 0) {
							var target = '{' + (key - 1) + '}';
							result = result.replace(target, val[key]);
						}
					});
				}
				el.innerHTML = result;
			}
		}
		return result;
	}
}

@Directive({ selector: '[i18nAttr]' })
export class I18nAttrDirective implements DoCheck {
	@Input()
		i18nAttr: string;

	private element: ElementRef;
	private translate: TranslateService;
	private isload: boolean = false;

	constructor(el:ElementRef, translate:TranslateService) {
		this.translate = translate;
		this.isload = this.translate.isload;
		this.element = el;
	}

	ngDoCheck() {
		if (this.isload !== this.translate.isload) {
			this.update();
			this.isload = this.translate.isload;
		}
	}

	update() {
		var val:any = this.i18nAttr.split('|');
		var el = this.element.nativeElement;
		if (val.length > 0) {
			var result:string = this.translate.getTranslate(val[0]);
			if (result !== undefined && result !== "") {
				if (val.length > 2) {
					val.forEach((n, key) => {
						if (key > 1) {
							var target = '{' + (key - 2) + '}';
							result = result.replace(target, val[key]);
						}
					});
				}
				el.setAttribute(val[1], result);
			}
		}
		return result;
	}
}