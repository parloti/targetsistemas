import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BlinkableComponent } from '../blinkable/blinkable.component';

@Component({
  selector: 'app-filter-array',
  templateUrl: './filter-array.component.html',
  styleUrls: ['./filter-array.component.scss']
})
export class FilterArrayComponent extends BlinkableComponent {
  constructor() {
    super();
    this._filteredValues = this.values;
  }

  private readonly _filterControle: FormControl = new FormControl();
  public get filterControle(): FormControl {
    return this._filterControle;
  }

  private readonly values: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private _filteredValues: number[];
  public get filteredValues(): number[] {
    return this._filteredValues;
  }

  public filter(): void {
    const value = this.filterControle.value;
    if (typeof value === "number") {
      this._filteredValues = this.values.filter(v => v <= value)
    } else {
      this._filteredValues = []
    }
    this.blink();
  }
}
