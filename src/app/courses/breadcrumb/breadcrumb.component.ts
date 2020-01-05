import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'angular-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  title$: Observable<string>;

  constructor(private breadcrumbService: BreadcrumbService) { 
  }

  ngOnInit() {
    this.title$ = this.breadcrumbService.title$;
  }
}
