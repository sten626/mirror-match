import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AlertDialogData {
  title?: string;
  content: string;
  confirmButtonText: string;
}

@Component({
  selector: 'mm-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {}
}
