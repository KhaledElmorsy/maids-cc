import { Component, OnInit } from '@angular/core';
import { UsersService } from '@/app/users/shared/users.service';
import { User } from '@/app/users/shared/user.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  totalPages?: number;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService
      .getTotalPages()
      .subscribe((totalPages) => (this.totalPages = totalPages));
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  updatePage(e: PageEvent) {
    this.userService
      .getUsers({ page: e.pageIndex + 1 })
      .subscribe((users) => {
      this.users = users;        
      });
  }
}
