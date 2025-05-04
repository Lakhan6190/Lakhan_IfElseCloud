import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  imports: [NgIf],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {


  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to delete?';
  @Input() showMessage: boolean = true; 
  @Input() confirmText = 'Yes';
  @Input() cancelText = 'Cancel';
  @Input() okText = 'OK';


  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();

  confirm() {
    this.confirmed.emit();
  }

  cancel() {
    this.cancelled.emit();
  }

  okEvent() {
    this.ok.emit(); 
}
}
