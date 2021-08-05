import { NgClass } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockDirective, ngMocks } from 'ng-mocks';
import { BlinkerComponent } from './blinker.component';


describe(BlinkerComponent.name, () => {
  let component: BlinkerComponent<unknown>;
  let fixture: ComponentFixture<BlinkerComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlinkerComponent, MockDirective(NgClass)]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlinkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`should not blinking by default`, () => {
    const result = component.blinking;
    const expected = false;

    expect(result).toBe(expected);
  });

  it(`should stop blinking`, () => {
    component.blinking = true;
    component.onBlinked();

    const result = component.blinking;
    const expected = false;
    expect(result).toBe(expected);
  });

  it(`should emit 'blinkingStopped'`, () => {
    const emitSpy = spyOn(component.blinkingStopped, 'emit')

    component.onBlinked();

    expect(emitSpy).toHaveBeenCalledOnceWith();
  });

  it(`should stop blinking on 'animationend'`, () => {
    const onBlinkedSpy = spyOn(component, 'onBlinked');

    const element = fixture.debugElement.query(By.css('.blinkable'))
    element.triggerEventHandler('animationend', void 0);

    expect(onBlinkedSpy).toHaveBeenCalledOnceWith();
  });

  function testBlinkingClass(blinking: boolean): void {
    const ngClassDirective = ngMocks.findInstance(fixture.debugElement, NgClass);

    const blinkingSpy = spyOnProperty(component, 'blinking');
    blinkingSpy.and.returnValue(blinking);

    fixture.detectChanges();
    let expected = (ngClassDirective.ngClass as {
      [klass: string]: any;
    })['blinking'];

    expect(expected).toBe(blinking);
  }

  it(`should enable 'blinking'-class`, () => {
    testBlinkingClass(true);
  });

  it(`should disable 'blinking'-class`, () => {
    testBlinkingClass(false);
  });

  it(`should bind 'content' to '.blinkable'`, () => {
    const value = "9";
    component.content = value;
    // const valueSpy = spyOnProperty(component, 'content');
    // valueSpy.and.returnValue(value);

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.blinkable'))
    const result = element.nativeElement.textContent.trim();

    expect(result).toBe(value);
  });
});
