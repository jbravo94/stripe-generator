import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { StripeGeneratorService } from '../stripe-generator-service';
import { LocalStorageService } from '../local-storage-service';

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

  colorOne = new FormControl('');
  colorTwo = new FormControl('');
  rows = new FormControl('');

  pattern: any = [];

  constructor(private stripeGeneratorService: StripeGeneratorService, private localStorageService: LocalStorageService) {
    
    this.colorOne.setValue(localStorageService.getValueForKeyOrDefault("color-one", this.defaultColorOne));
    this.colorTwo.setValue(localStorageService.getValueForKeyOrDefault("color-two", this.defaultColorTwo));
    this.rows.setValue(localStorageService.getValueForKeyOrDefault("rows", this.defaultRows));

    this.generatePattern();  
  }

  submit(e: SubmitEvent) {
    e.preventDefault();

    this.localStorageService.setValueForKey("color-one", this.colorOne.value || this.defaultColorOne);
    this.localStorageService.setValueForKey("color-two", this.colorTwo.value || this.defaultColorTwo);
    this.localStorageService.setValueForKey("rows", this.rows.value || this.defaultRows);

    this.generatePattern();
  }

  generatePattern() {
    this.pattern = this.stripeGeneratorService.calculatePattern([this.colorOne.value || this.defaultColorOne, this.colorTwo.value || this.defaultColorTwo], parseInt(this.rows.value || this.defaultRows));
  }
}
