import { Component } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthorizationService]
})
export class AppComponent {

  public isAuth = false;
  private subscription: Subscription;

  constructor(private authService: AuthorizationService) {
    this.isAuth = this.authService.isAuthentificated();
    this.subscription = authService.checkAuth.subscribe((value) => { 
      this.isAuth = value.isAuthentificated; 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
