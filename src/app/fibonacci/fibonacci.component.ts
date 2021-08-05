import { Component } from '@angular/core';
import { BlinkableComponent } from '../blinkable/blinkable.component';
import { fibonacci } from '../utilities';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent extends BlinkableComponent {
  private index: number = 1;

  private _value: number = 1;
  public get value(): number {
    return this._value;
  }

  public calculateNextTerm(): void {
    this.index++;
    const value = fibonacci(this.index);
    this._value = value;
    this.blink();
  }

}
