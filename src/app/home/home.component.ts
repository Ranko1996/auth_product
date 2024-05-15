import { Component } from '@angular/core';
import { ProductsFirebaseService } from '../services/products-firebase.service';
import { ProductInterface } from '../types/product.interface';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private productsService: ProductsFirebaseService
  ) {}

  products: ProductInterface[] = [];

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      console.log(products)
      this.products = products;
    })
  }
}
