import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BlinkableComponent } from '../blinkable/blinkable.component';

@Component({
  selector: 'app-blinker[blinking][content]',
  templateUrl: './blinker.component.html',
  styleUrls: ['./blinker.component.scss']
})
export class BlinkerComponent<TContent> extends BlinkableComponent {

  @Input() public get blinking(): boolean {
    return super.blinking;
  }
  public set blinking(v: boolean) {
    super.blinking = v;
  }

  public onBlinked(): void {
    this._blinkingStopped.emit();
    super.onBlinked();
  }

  private _blinkingStopped: EventEmitter<void> = new EventEmitter<void>();

  @Output() public get blinkingStopped(): EventEmitter<void> {
    return this._blinkingStopped;
  }

  private _content: TContent | undefined;
  @Input() public get content(): TContent | undefined {
    return this._content;
  }
  public set content(v: TContent | undefined) {
    this._content = v;
  }

}
