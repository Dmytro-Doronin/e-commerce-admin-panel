import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton, MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-delete-confirmation-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss'
})
export class DeleteConfirmationDialogComponent1 {
  private dialogRef = inject(MatDialogRef<DeleteConfirmationDialogComponent1>)
  readonly data = inject(MAT_DIALOG_DATA)

  onCancel(): void {
    this.dialogRef.close(false)
  }

  onConfirm(): void {
    this.dialogRef.close(true)
  }
}
