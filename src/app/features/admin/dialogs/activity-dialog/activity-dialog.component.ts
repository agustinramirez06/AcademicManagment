import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-activity-dialog',
  imports: [CommonModule, MatDialogModule, MatIconModule, MatListModule, MatButtonModule],
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent {
  logs = (inject(MAT_DIALOG_DATA) as { logs?: { action: string; when: string }[] })?.logs || [];
}
