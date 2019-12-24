import { createAction } from '@ngrx/store';

export const closeSidenav = createAction(
  '[Layout] Close Sidenav'
);

export const openSidenav = createAction(
  '[Layout] Open Sidenav'
);
