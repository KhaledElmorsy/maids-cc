import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { UsersService } from '../../shared/users.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
} from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
})
export class UserSearchComponent implements OnInit {
  user$!: Observable<User | null>;
  private searchTerm = new Subject<string>();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.user$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.usersService.getUser(Number(term)))
    );
  }

  search(term: string) {
    this.searchTerm.next(term);
  }
}
