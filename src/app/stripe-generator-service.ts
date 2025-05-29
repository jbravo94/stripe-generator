import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeGeneratorService {

  constructor() { }
 
  private getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  calculatePattern(colors: string[], rows: number) {
 
    const stripes = [];
    console.log(colors);

    for (let i = 0; i < rows; i++) {
      const lines = this.getRandomArbitrary(1, 4);
      console.log(this.getRandomArbitrary(0, colors.length - 1));
      let colorIndex = this.getRandomArbitrary(0, colors.length);

      if (stripes.length != 0 && stripes[stripes.length - 1] === colors[colorIndex]) {
        colorIndex = (colorIndex + 1) % colors.length;
      }

      const color = colors[colorIndex];

      for (let j = 0; j < lines; j++) {
        stripes.push(color);
      }
    }
    
    return stripes.slice(0, rows);
  }
}
