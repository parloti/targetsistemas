import { TestBed } from '@angular/core/testing';
import { MatDivider } from '@angular/material/divider';
import { MockComponents } from 'ng-mocks';
import { AppComponent } from './app.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { FilterArrayComponent } from './filter-array/filter-array.component';
import { ShowHideImageComponent } from './show-hide-image/show-hide-image.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,MockComponents(FibonacciComponent,MatDivider,ShowHideImageComponent,FilterArrayComponent)
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
