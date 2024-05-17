import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, onIdTokenChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private auth: Auth) {}

  getUsers(): Observable<any> {
    return new Observable(observer => {
      onIdTokenChanged(this.auth, user => {
        if (user) {
          user.getIdToken().then(idToken => {
            const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
            this.http.get('http://localhost:3000/admin/getUsers', { headers, withCredentials: true }).subscribe({
              next: (data) => {
                observer.next(data);
                observer.complete();
              },
              error: (err) => {
                observer.error(err);
              }
            });
          });
        } else {
          observer.error('User not logged in');
        }
      });
    });
  }
}
