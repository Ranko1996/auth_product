import { Component } from '@angular/core';
import { ProductsFirebaseService } from '../services/products-firebase.service';
import { ProductInterface } from '../types/product.interface';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../layout/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, EditPopupComponent, ButtonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private productsService: ProductsFirebaseService
  ) {}

  products: ProductInterface[] = [];

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: ProductInterface) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: ProductInterface) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: ProductInterface = {
    name: "",
    id: "ASD",
    image: "",
    price: 0, 
    description: ""
  }

  onConfirmEdit(product: ProductInterface) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id!);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: ProductInterface) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  // editProduct(product: ProductInterface, id: string) {
  //   this.productsService.editProduct(id, product.name, product.price, product.image, product.description);
  // }

  editProduct(product: ProductInterface, id: string) {
    this.productsService.editProduct(id, product.name, product.price, product.image, product.description)
      .subscribe(() => {
        console.log(`Product with ID: ${id} has been updated`);
        // Ažurirajte lokalnu listu proizvoda ako je potrebno
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
          this.products[index] = { ...product, id };
        }
      }, error => {
        console.error('Error updating product:', error);
      });
  }

  deleteProduct(id: string) {
    this.productsService.removeProduct(id)
      .subscribe(() => {
        console.log(`Product with ID: ${id} has been deleted`);
        // Uklonite proizvod iz lokalne liste proizvoda
        this.products = this.products.filter(product => product.id !== id);
      }, error => {
        console.error('Error deleting product:', error);
      });
  }

  addProduct(product: ProductInterface) {
    this.productsService.addProduct(product.name, product.price, product.image, product.description)
      .subscribe((id) => {
        console.log(`Product added with ID: ${id}`);
        // Dodajte novi proizvod u lokalnu listu proizvoda
        this.products.push({ ...product, id });
      }, error => {
        console.error('Error adding product:', error);
      });
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      console.log(products)
      this.products = products;
    })
  }
}
