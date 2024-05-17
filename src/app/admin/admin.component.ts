import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ButtonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getUsers().subscribe({
      next: users => {
        console.log('Users fetched:', users);
        this.users = users;
      },
      error: err => {
        console.error('Error fetching users:', err);
      }
    });
  }

  deleteUser(userId: string) {
    console.log('Deleting user with id:', userId); // Logirajte userId
    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        console.log(`User ${userId} deleted`);
        this.fetchUsers(); // Refresh the user list
      },
      error: err => {
        console.error('Error deleting user:', err);
      }
    });
  }
  

  setAsAdmin(userId: string) {
    console.log(`SET AD SDMIN ${userId}`)
    this.adminService.setAsAdmin(userId).subscribe({
      next: () => {
        console.log(`User ${userId} set as admin`);
        this.fetchUsers(); // Refresh the user list
      },
      error: err => {
        console.error('Error setting user as admin:', err);
      }
    });
  }
}
