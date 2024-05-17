import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {}

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
}
