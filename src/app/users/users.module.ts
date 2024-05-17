import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';

import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [UsersComponent, UserListComponent],
  exports: [UsersComponent],
  imports: [
    CommonModule,
  
    /** Angular Material */
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule
  ],
})
export class UsersModule {}
