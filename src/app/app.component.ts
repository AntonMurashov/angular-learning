import { Component, Input } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthorizationService]
})
export class AppComponent {

  public isAuth = false;
  _subscription: Subscription;

  constructor(private authService: AuthorizationService) {
    this.isAuth = this.authService.IsAuthentificated();
    this._subscription = authService.checkAuth.subscribe((value) => { 
      this.isAuth = value.isAuthentificated; 
    });
  }
}
