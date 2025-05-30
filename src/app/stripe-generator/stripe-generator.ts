import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { StripeGeneratorService } from '../stripe-generator-service';
import { LocalStorageService } from '../local-storage-service';
import { ColorService } from '../color-service';

@Component({
  selector: 'app-stripe-generator',
  imports: [ReactiveFormsModule],
  templateUrl: './stripe-generator.html',
  styleUrl: './stripe-generator.css'
})
export class StripeGenerator {

  private defaultColorOne = '#0000ff';
  private defaultColorTwo = '#00ff00';
  private defaultRows = '50';

  stripeGeneratorForm: FormGroup;

  pattern: any = [];

  printFriendly = false;

  constructor(
    private stripeGeneratorService: StripeGeneratorService, 
    private localStorageService: LocalStorageService,
    private colorService: ColorService,
    private formBuilder: FormBuilder) {
    
    const colorOne = localStorageService.getValueForKeyOrDefault("color-one", this.defaultColorOne);
    const colorTwo = localStorageService.getValueForKeyOrDefault("color-two", this.defaultColorTwo);
    const rows = localStorageService.getValueForKeyOrDefault("rows", this.defaultRows);

    this.stripeGeneratorForm = formBuilder.group({
      colorOne: [colorOne, [
          Validators.required
      ]],
      colorTwo: [colorTwo, [
          Validators.required
      ]],
      rows: [rows, [
          Validators.required,
          Validators.min(1),
          Validators.max(10000)
      ]],
      stripePatternConfiguration: this.formBuilder.array([1,2,3,4].map((e) =>
        this.formBuilder.group({
          used: [true],
          probability: [100]
        })
      ))
    })

    this.generatePattern();  
  }

  appendStripePatternConfigurationItem() {
    const stripePatternConfiguration = this.stripeGeneratorForm.get('stripePatternConfiguration') as FormArray;

    stripePatternConfiguration.controls.push(
      this.formBuilder.group({
        used: [true],
        probability: [100]
      })
    )
  }

  resetStripePatternConfigurationItem() {
    const stripePatternConfiguration = this.stripeGeneratorForm.get('stripePatternConfiguration') as FormArray;

    stripePatternConfiguration.controls.splice(4);

    stripePatternConfiguration.controls.forEach((e) => {
      e.patchValue({used: true, probability: 100});
    });
  }

  popStripePatternConfigurationItem() {
    const stripePatternConfiguration = this.stripeGeneratorForm.get('stripePatternConfiguration') as FormArray;

    stripePatternConfiguration.controls.pop();
  }

  get stripePatternConfiguration(): FormControl[] {
    return (this.stripeGeneratorForm.get('stripePatternConfiguration') as FormArray).controls as FormControl[];
  }

  getValue(formControlName: string) {
    return this.stripeGeneratorForm.get(formControlName)?.value;
  }

  getColorNameForCode(hexCodeString: string) {
    return this.colorService.getColorNameByHexCode(hexCodeString);
  }

  isFormControlValid(formControlName: string) {
    return this.stripeGeneratorForm.get(formControlName)?.valid;
  }

  togglePrintFriendly() {
    this.printFriendly = !this.printFriendly;
  }

  submit(e: SubmitEvent) {
    e.preventDefault();

    this.stripeGeneratorForm.patchValue({
      colorOne: this.colorService.getClosestTextColor(this.stripeGeneratorForm.controls['colorOne'].value || this.defaultColorOne),
      colorTwo: this.colorService.getClosestTextColor(this.stripeGeneratorForm.controls['colorTwo'].value || this.defaultColorTwo),
    });

    this.localStorageService.setValueForKey("color-one", this.stripeGeneratorForm.controls['colorOne'].value || this.defaultColorOne);
    this.localStorageService.setValueForKey("color-two", this.stripeGeneratorForm.controls['colorTwo'].value || this.defaultColorTwo);
    this.localStorageService.setValueForKey("rows", this.stripeGeneratorForm.controls['rows'].value || this.defaultRows);

    this.generatePattern();
  }

  generatePattern() {
    this.pattern = this.stripeGeneratorService.calculatePattern([this.stripeGeneratorForm.controls['colorOne'].value || this.defaultColorOne, this.stripeGeneratorForm.controls['colorTwo'].value || this.defaultColorTwo], parseInt(this.stripeGeneratorForm.controls['rows'].value || this.defaultRows));
  }
}
