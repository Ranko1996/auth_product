import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { UserInterface } from './types/user.interface';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HomeComponent, HeaderComponent, FooterComponent, LoginComponent, RegisterComponent]
})
export class AppComponent {
  authService = inject(AuthService)

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if(user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        })
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    })
  }

  logout(): void {
    this.authService.logout();
  }
  title = 'auth_product';
}
