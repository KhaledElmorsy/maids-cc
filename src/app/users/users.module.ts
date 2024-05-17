import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserSearchComponent } from './components/user-search/user-search.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserDetailsComponent,
    UserSearchComponent,
  ],
  exports: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule,

    /** Angular Material */
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class UsersModule {}
