import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlDirective } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { MockComponent, MockDirective, MockModule, ngMocks } from 'ng-mocks';
import { BlinkerComponent } from '../blinker/blinker.component';
import { FilterArrayComponent } from './filter-array.component';


describe(FilterArrayComponent.name, () => {
  let component: FilterArrayComponent;
  let fixture: ComponentFixture<FilterArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterArrayComponent, MockComponent(BlinkerComponent), MockDirective(FormControlDirective)],
      imports: [MockModule(MatRippleModule)]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  describe(`filter`, () => {
    it(`should filter 'values'`, () => {
      const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      for (let userValue = 0; userValue <= 10; userValue++) {
        component.filterControle.patchValue(userValue);
        component.filter();

        const result = component.filteredValues;
        const expected = values.slice(0, userValue + 1);

        expect(result).toEqual(expected);
      }

    });

    it(`should clear 'filteredValues'`, () => {
      component.filterControle.patchValue(void 0);

      component.filter();

      const result = component.filteredValues;
      const expected: number[] = [];

      expect(result).toEqual(expected);

    });
    it(`should blink`, () => {
      component.onBlinked();
      component.filter();

      const result = component.blinking;
      const expected = true;

      expect(result).toBe(expected);

    });
  })

  it(`should call 'onBlinked' on 'blinkingStopped'`, () => {
    const onBlinkedSpy = spyOn(component, 'onBlinked');

    const blinkerDE = fixture.debugElement.query(By.css('app-blinker'));
    const blinker = ngMocks.get(blinkerDE, BlinkerComponent);
    blinker.blinkingStopped.emit();

    expect(onBlinkedSpy).toHaveBeenCalledOnceWith();

  })

  it(`should 'filter' on 'click'`, () => {
    const filterSpy = spyOn(component, 'filter');

    const element = fixture.debugElement.query(By.css('.filter-button'))
    element.triggerEventHandler('click', void 0);

    expect(filterSpy).toHaveBeenCalledOnceWith();
  });
});
