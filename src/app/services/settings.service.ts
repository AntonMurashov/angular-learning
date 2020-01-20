import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private translate: TranslateService) { }

  setLanguage(language: string): Observable<string> {
    return this.translate.use(language);
  }
}
