import { Injectable } from '@angular/core';

@Injectable()

export class Config {
	api: any = {
		base: "http://devapi.faselis.com/",
		version: "v1.26"
	};
}