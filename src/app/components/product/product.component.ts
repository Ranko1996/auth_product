import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../../types/product.interface';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, ButtonModule, EditPopupComponent,],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  constructor(private confirmationSevice: ConfirmationService) {}
  @Input() product!: ProductInterface;
  @Output() edit: EventEmitter<ProductInterface> = new EventEmitter<ProductInterface>();
  @Output() delete: EventEmitter<ProductInterface> = new EventEmitter<ProductInterface>();

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    this.confirmationSevice.confirm({
      message: "Are you sure that you want to delete this product?",
      accept: () => {
        this.deleteProduct();
      }
    })
  }
  
  deleteProduct() {
    this.delete.emit(this.product);
  }

  ngOnInit() {

  }
}
