import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'angular-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  title: string;

  constructor(private breadcrumbService: BreadcrumbService, private cdr: ChangeDetectorRef) { 
  }

  ngOnInit() {
    this.breadcrumbService.title.subscribe(title => {
      if (title != "") {
        this.title = ' / ' + title;
      } else {
        this.title = "";
      }
      this.cdr.detectChanges();
    });
  }

  ngOnChanges() {
  }
}
