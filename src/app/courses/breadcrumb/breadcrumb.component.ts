import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'angular-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  name: string;

  constructor(private breadcrumbService: BreadcrumbService, private cdr: ChangeDetectorRef) { 
  }

  ngOnInit() {
    this.breadcrumbService.name.subscribe(name => {
      if (name != "") {
        this.name = ' / ' + name;
      } else {
        this.name = "";
      }
      this.cdr.detectChanges();
    });
  }
}
