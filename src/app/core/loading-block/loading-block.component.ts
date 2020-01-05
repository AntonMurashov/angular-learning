import { Component, OnInit } from '@angular/core';
import { LoadingBlockService } from 'src/app/services/loading-block.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'angular-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.scss']
})
export class LoadingBlockComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(private loadingBlockService: LoadingBlockService) { }

  ngOnInit() {
    this.isLoading$ = this.loadingBlockService.isLoading$;
  }

}
