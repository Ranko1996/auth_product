import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../types/product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: ProductInterface;
}
