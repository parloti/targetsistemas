import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent, ngMocks } from 'ng-mocks';
import { BlinkerComponent } from '../blinker/blinker.component';
import { ShowHideImageComponent } from './show-hide-image.component';


describe(ShowHideImageComponent.name, () => {
  let component: ShowHideImageComponent;
  let fixture: ComponentFixture<ShowHideImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowHideImageComponent, MockComponent(BlinkerComponent)]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHideImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`should switch visible status`, () => {
    const prevStatus = component.visible;

    component.switchStatus();

    const expected = !prevStatus;
    const result = component.visible;

    expect(expected).toBe(result);
  });

  it(`should have visible status by default`, () => {
    const expected = true;
    const result = component.visible;

    expect(expected).toBe(result);
  });

  it(`should blink`, () => {
    component.onBlinked();
    component.switchStatus();

    const result = component.blinking;
    const expected = true;

    expect(result).toBe(expected);

  });

  it(`should set 'app-blinker.content' to 'Visível'`, () => {
    const blinkerDE = fixture.debugElement.query(By.css('app-blinker'));
    const blinker = ngMocks.get(blinkerDE, BlinkerComponent);

    const expected = 'Visível';
    const result = blinker.content;

    expect(result).toBe(expected);
  })

  it(`should set 'app-blinker.content' to 'Invisível'`, () => {
    const blinkerDE = fixture.debugElement.query(By.css('app-blinker'));
    const blinker = ngMocks.get(blinkerDE, BlinkerComponent);

    component.switchStatus();
    fixture.detectChanges();

    const expected = 'Invisível';
    const result = blinker.content

    expect(result).toBe(expected);
  })

  it(`should call 'onBlinked' on 'blinkingStopped'`, () => {
    const onBlinkedSpy = spyOn(component, 'onBlinked');

    const blinkerDE = fixture.debugElement.query(By.css('app-blinker'));
    const blinker = ngMocks.get(blinkerDE, BlinkerComponent);
    blinker.blinkingStopped.emit();

    expect(onBlinkedSpy).toHaveBeenCalledOnceWith();

  })

  it(`should 'switchStatus' on 'click'`, () => {
    const switchStatusSpy = spyOn(component, 'switchStatus');

    const element = fixture.debugElement.query(By.css('.switch-status'))
    element.triggerEventHandler('click', void 0);

    expect(switchStatusSpy).toHaveBeenCalledOnceWith();
  });

  it(`should set 'button.textContent' to 'Hide'`, () => {
    const buttonDE = fixture.debugElement.query(By.css('button'));
    const button = buttonDE.nativeElement as HTMLButtonElement;

    const expected = 'Hide';
    const result = button.textContent?.trim();

    expect(result).toBe(expected);
  })

  it(`should set 'button.textContent' to 'Show'`, () => {
    const buttonDE = fixture.debugElement.query(By.css('button'));
    const button = buttonDE.nativeElement as HTMLButtonElement;

    component.switchStatus();
    fixture.detectChanges();

    const expected = 'Show';
    const result = button.textContent?.trim();

    expect(result).toBe(expected);
  })


  it(`should show image`, () => {
    const imageDE = fixture.debugElement.query(By.css('div.ng'))
    expect(imageDE).toBeTruthy();

  })

  it(`should hide image`, () => {
    component.switchStatus();
    fixture.detectChanges();

    const imageDE = fixture.debugElement.query(By.css('div.ng'))
    expect(imageDE).toBeFalsy();
  })
});
