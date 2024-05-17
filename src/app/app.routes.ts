import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'admin', 
        component: AdminComponent,
        canActivate: [AdminGuard] // Dodavanje AdminGuard-a
    },
    { 
        path: 'register', 
        component: RegisterComponent 
    },
    { 
        path: 'admin', 
        component: AdminComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { 
        path: 'home/:id', 
        component: ProductDetailComponent 
    },
];
