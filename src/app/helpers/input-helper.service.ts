import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InputHelperService {

  constructor() { }

  checkRequired(control: AbstractControl): string {
    return (control.errors) && (control.errors.required) && (control.touched) ?
     'This field is required' : null;
  }

  checkMaxLength(control: AbstractControl): string {
    return (control.errors) && (control.errors.maxlength) ?
     'Value is too long' : null;
  }
}
