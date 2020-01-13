import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, 
  Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDateComponent),
      multi: true,
    }]
})

export class CourseDateComponent implements ControlValueAccessor, Validator {

  @Input()
  formControl: FormControl;

  startDate: string;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let DATE_REGEXP = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;    
    
    if (this.startDate == '') {
      return {
        dateRequiredError: {
          valid: false
        }
      };
    }
    return DATE_REGEXP.test(this.startDate) ? null : {
      incorrectDateFormat: {
        valid: false
      }
    };
  }

  private onChange = (_: any) => { };
  private onTouch = () => { };

  writeValue(obj: any): void {
    this.startDate = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onDataChange(event) {
    this.startDate = event.target.value;
    this.onChange(this.startDate);
    this.onTouch();
  }

  onKeyUp(event) {
    this.onDataChange(event);
  }
}
