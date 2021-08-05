import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlinkableComponent } from './blinkable.component';


@Component({
  selector: 'app-implementation',
  template: '',
})
export class Implementation extends BlinkableComponent {

  public blink(): void {
    super.blink();
  }
}

describe(BlinkableComponent.name, () => {
  let component: Implementation;
  let fixture: ComponentFixture<Implementation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Implementation]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Implementation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should not blinking by default`, () => {
    const result = component.blinking;
    const expected = false;

    expect(result).toBe(expected);
  });

  it(`should start blinking`, () => {
    component.blink();

    const result = component.blinking;
    const expected = true;

    expect(result).toBe(expected);
  });

  it(`should stop blinking`, () => {
    component.blink();
    component.onBlinked();

    const result = component.blinking;
    const expected = false;
    expect(result).toBe(expected);
  });
});
