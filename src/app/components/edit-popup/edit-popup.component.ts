import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog'
import { ProductInterface } from '../../types/product.interface';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
 @Input() display: boolean = false;
 
 @Output() displayChange = new EventEmitter<boolean>();
 @Output() confirm = new EventEmitter<ProductInterface>();

 @Input() header!: string;

 @Input() product: ProductInterface = {
  name: '',
  image: '',
  description: '', 
  price: 0,
 }

 onConfirm() {
  this.confirm.emit(this.product);
  this.display = false;
  this.displayChange.emit(this.display);
 }

 onCancel() {
  this.display = false;
  this.displayChange.emit(this.display);
 }
}

