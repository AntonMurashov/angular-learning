import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, AbstractControl, ValidationErrors, 
  ControlValueAccessor, Validator } from '@angular/forms';
import { InputHelperService } from 'src/app/helpers/input-helper.service';

@Component({
  selector: 'course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDurationComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDurationComponent),
      multi: true,
    }]
})
export class CourseDurationComponent implements ControlValueAccessor, Validator {

  @Input()
  formControl: FormControl;

  length: string;

  constructor(public inputHelperService: InputHelperService) { }

  validate(control: AbstractControl): ValidationErrors | null {
    let NUMBER_REGEXP = /^[0-9]*$/gm;    

    if (!this.length) {
      return {
        required: {
          valid: true
        }
      };
    }

    return NUMBER_REGEXP.test(this.length) ? null : {
      incorrectSymbols: {
        valid: true
      }
    }; 
  }

  private onChange = (_: any) => { };
  public onTouch = () => { };

  writeValue(obj: any): void {
    this.length = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onDataChange(event) {
    this.length = event.target.value;
    this.onChange(this.length);
    this.onTouch();
  }

  onKeyUp(event) {
    this.onDataChange(event);
  }

}
