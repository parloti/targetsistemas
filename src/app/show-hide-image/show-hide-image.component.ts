import { Component } from '@angular/core';
import { BlinkableComponent } from '../blinkable/blinkable.component';

@Component({
  selector: 'app-show-hide-image',
  templateUrl: './show-hide-image.component.html',
  styleUrls: ['./show-hide-image.component.scss']
})
export class ShowHideImageComponent extends BlinkableComponent {

  public switchStatus(): void {
    this._visible = !this._visible;
    this.blink();
  }

  private _visible: boolean = true;
  public get visible(): boolean {
    return this._visible;
  }
}
