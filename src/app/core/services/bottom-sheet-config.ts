import { InjectionToken } from '@angular/core';

export const BOTTOM_SHEET_DATA = new InjectionToken<any>('BottomSheetData');

export class BottomSheetConfig<D = any> {
  data?: D = null;
}
