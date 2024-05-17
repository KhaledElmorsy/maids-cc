import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '@/app/users/shared/user.model';
import { UsersService } from '@/app/users/shared/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  user?: User;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.getUser(id).subscribe((user) => (this.user = user));
  }

  back() {
    this.location.back()
  }

}
