import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private readonly _dialog = inject(MatDialog)

  openModal<CT, T>(componentRef: ComponentType<CT>, data?: T, isEditing: boolean = false): void {
    const config = { data, isEditing };

    this._dialog.open(componentRef, {
      width: '500px',
      height: '500px',
      hasBackdrop: true,
      disableClose: true,
      data: config
    });
  }

  closeModal(): void {
    this._dialog.closeAll();
  }
}
