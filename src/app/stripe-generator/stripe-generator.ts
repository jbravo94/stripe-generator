import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { StripeGeneratorService } from '../stripe-generator-service';

@Component({
  selector: 'app-stripe-generator',
  imports: [ReactiveFormsModule],
  templateUrl: './stripe-generator.html',
  styleUrl: './stripe-generator.css'
})
export class StripeGenerator {
  colorOne = new FormControl('#0000ff');
  colorTwo = new FormControl('#00ff00');
  rows = new FormControl('50');

  pattern: any = [];

  constructor(private stripeGeneratorService: StripeGeneratorService){
    this.pattern = this.stripeGeneratorService.calculatePattern([this.colorOne.value || '#0000ff', this.colorTwo.value || '#00ff00'], parseInt(this.rows.value || '50'));
  }

  submit(e: SubmitEvent){
    e.preventDefault();

    this.pattern = this.stripeGeneratorService.calculatePattern([this.colorOne.value || '#0000ff', this.colorTwo.value || '#00ff00'], parseInt(this.rows.value || '50'));
  }
}
