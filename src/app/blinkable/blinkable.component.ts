import { Component } from '@angular/core';

@Component({
  selector: 'app-blinkable',
  template: ''
})
export abstract class BlinkableComponent {

  public onBlinked(): void {
    this._blinking = false;
  }

  private _blinking: boolean = false;
  public get blinking(): boolean {
    return this._blinking;
  }
  public set blinking(v: boolean) {
    this._blinking = v;
  }

  protected blink(): void {
    this._blinking = true;
  }
}
