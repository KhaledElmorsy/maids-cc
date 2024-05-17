import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.usersService.getUser(id).subscribe((user) => {
        if (!user) {
          this.router.navigate(['../']);
        } else {
          this.user = user;
        }
      });
    })
  }

  back() {
    this.location.back();
  }
}
