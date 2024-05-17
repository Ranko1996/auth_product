import { Injectable, inject, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "../types/user.interface";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
  constructor(private auth: Auth) {}
    firebaseAuth = inject(Auth);
    user$  = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined);
    router = inject(Router);
    

    register(email: string, username: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth, 
            email, 
            password
        ).then(response => updateProfile(response.user, {displayName: username}));
        return from(promise);
    }

    // login(email: string, password: string): Observable<void> {
    //     const promise = signInWithEmailAndPassword(
    //         this.firebaseAuth, 
    //         email, 
    //         password
    //     ).then(() => {});
    //     return from(promise);
    // }

    // login(email: string, password: string): Observable<void> {
    //     const promise = signInWithEmailAndPassword(
    //         this.firebaseAuth, 
    //         email, 
    //         password
    //     ).then(response => {
    //         // Dohvaćanje i ispisivanje JWT tokena
    //         return response.user.getIdToken().then(token => {
    //             console.log(token);
    //             console.log(user);
    //         });
    //     });
    //     return from(promise);
    // }

    // login(email: string, password: string): Observable<void> {
    //     const promise = signInWithEmailAndPassword(
    //         this.firebaseAuth, 
    //         email, 
    //         password
    //     ).then(response => {
    //         // Dohvaćanje i ispisivanje JWT tokena
    //         return response.user.getIdTokenResult().then(idTokenResult => {
    //             console.log('JWT token:', idTokenResult.token);
    //             console.log('User claims:', idTokenResult.claims);
    
    //             // Provjera je li korisnik administrator
    //             if (idTokenResult.claims["admin"]) {
    //                 console.log("Korisnik je administrator.");
    //                 // Dodajte ovdje kod koji želite izvršiti za administratore
    //             } else {
    //                 console.log("Korisnik nije administrator.");
    //                 // Dodajte ovdje kod koji želite izvršiti za obične korisnike
    //             }
    //         });
    //     });
    //     return from(promise);
    // }
    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
          this.auth, 
          email, 
          password
        ).then(response => {
          return response.user.getIdTokenResult().then(idTokenResult => {
            console.log('JWT token:', idTokenResult.token);
            console.log('User claims:', idTokenResult.claims);
    
            if (idTokenResult.claims['admin']) {
              console.log("Korisnik je administrator.");
            } else {
              console.log("Korisnik nije administrator.");
            }
          });
        });
        return from(promise);
      }


    // logout(): Observable<void> {
    //     const promise = signOut(this.firebaseAuth);
    //     return from(promise);
    // }
    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth).then(() => {
          this.router.navigate(['/login']);
        });
        return from(promise);
      }

    isLoggedIn(): boolean {
        const user = this.firebaseAuth.currentUser;
        return user !== null;
    }
}