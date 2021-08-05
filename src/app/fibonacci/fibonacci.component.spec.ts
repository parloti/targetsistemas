import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent, ngMocks } from 'ng-mocks';
import { spyOnModule } from 'src/testing';
import { BlinkerComponent } from '../blinker/blinker.component';
import * as FibonacciModule from '../utilities/fibonacci';
import { FibonacciComponent } from './fibonacci.component';

describe(FibonacciComponent.name, () => {
  let component: FibonacciComponent;
  let fixture: ComponentFixture<FibonacciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FibonacciComponent, MockComponent(BlinkerComponent)]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibonacciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`should calculate fibonacci next term`, () => {
    component.onBlinked();

    const termIndex = 2;
    const termValue = 5;

    const fibonacciSpy = spyOnModule(FibonacciModule, 'fibonacci').and.returnValue(termValue);

    component.calculateNextTerm();
    expect(fibonacciSpy).toHaveBeenCalledOnceWith(termIndex);

    fibonacciSpy.calls.reset();
    component.calculateNextTerm();
    expect(fibonacciSpy).toHaveBeenCalledOnceWith(termIndex + 1);

    const result = component.value;
    const expected = termValue;
    expect(result).toBe(expected);
  });

  it(`should start blinking`, () => {
    component.onBlinked();

    component.calculateNextTerm();
    const result = component.blinking;
    const expected = true;

    expect(result).toBe(expected);
  });

  it(`should call 'onBlinked' on 'blinkingStopped'`, () => {
    const onBlinkedSpy = spyOn(component, 'onBlinked');

    const blinkerDE = fixture.debugElement.query(By.css('app-blinker'));
    const blinker = ngMocks.get(blinkerDE, BlinkerComponent);
    blinker.blinkingStopped.emit();

    expect(onBlinkedSpy).toHaveBeenCalledOnceWith();

  })

  it(`should calculate fibonacci next term on click`, () => {
    component.onBlinked();

    const calculateNextTermSpy = spyOn(component, 'calculateNextTerm');

    const element = fixture.debugElement.query(By.css('button'))
    element.triggerEventHandler('click', void 0);

    expect(calculateNextTermSpy).toHaveBeenCalledOnceWith();
  });
});
