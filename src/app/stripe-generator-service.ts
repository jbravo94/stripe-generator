import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeGeneratorService {

  constructor() { }
 
  private getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private getRandomValueByProbabilities(distributionOptions: any[]) {

    const weights: number[] = [];
    const normalizedWeights: number[] = [];
    const results: number[] = [];

    let sumWeights: number = 0;

    distributionOptions.forEach((option, index) => {
      
      if (option['used']) {
        const probability = option['probability'];

        sumWeights += probability;
        weights.push(probability);
      } else {
        weights.push(0);
      }
      
      results.push(index + 1);
    });

    weights.forEach((weight: number) => {
      normalizedWeights.push(weight / sumWeights);
    })

    let num = Math.random(),
        s = 0,
        lastIndex = normalizedWeights.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        s += normalizedWeights[i];
        if (num < s) {
            return results[i];
        }
    }

    return results[lastIndex];
  }

  calculatePattern(colors: string[], rows: number, distributionOptions?: any[]) {

    if (rows == null || rows <= 0) {
      rows = 1;
    }

    if (rows > 10000) {
      rows = 10000;
    }

    if (distributionOptions == null) {
      distributionOptions = [1,2,3,4].map((e) => {return {'used': true, 'probability': 100}});
    }
 
    const stripes = [];

    for (let i = 0; i < rows; i++) {
      const lines = this.getRandomValueByProbabilities(distributionOptions);

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
