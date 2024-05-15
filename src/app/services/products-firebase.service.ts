import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductInterface } from '../types/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsFirebaseService {
  firestore = inject(Firestore)
  productsCollection = collection(this.firestore, 'products')

  getProducts(): Observable<ProductInterface[]> {
    return collectionData(this.productsCollection, {
        idField: 'id',
    }) as Observable<ProductInterface[]>;
}

  // constructor() { }
}
