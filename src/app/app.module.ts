import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from './app.component';
import { FibonacciComponent } from './fibonacci/fibonacci.component';
import { FilterArrayComponent } from './filter-array/filter-array.component';
import { ShowHideImageComponent } from './show-hide-image/show-hide-image.component';
import { BlinkerComponent } from './blinker/blinker.component';

@NgModule({
  declarations: [
    AppComponent,
    FibonacciComponent,
    ShowHideImageComponent,
    FilterArrayComponent,
    BlinkerComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, FlexLayoutModule, MatDividerModule, ReactiveFormsModule, MatRippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
