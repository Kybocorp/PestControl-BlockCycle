import { Component, OnInit  } from '@angular/core';
declare let $;
@Component({
  selector: 'ma-rightsidebar',
  templateUrl: './rightsidebar.component.html'
})
export class RightSidebarComponent {
	constructor() {}
	ngOnInit() {
		var body = $("body");
	}
}
