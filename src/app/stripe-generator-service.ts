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

    if (rows == null || rows <= 0) {
      rows = 1;
    }

    if (rows > 10000) {
      rows = 10000;
    }
 
    const stripes = [];

    for (let i = 0; i < rows; i++) {
      const lines = this.getRandomArbitrary(1, 4);

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
