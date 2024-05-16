import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCSGrAvmcYo1LVIe1Oz4L5t5fTpj8mNE68",
  authDomain: "angular-products-10c5e.firebaseapp.com",
  projectId: "angular-products-10c5e",
  storageBucket: "angular-products-10c5e.appspot.com",
  messagingSenderId: "915326456321",
  appId: "1:915326456321:web:310b80b3fd6b8aa81da600"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),]),
    provideAnimations()
  ]
};
