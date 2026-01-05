import { Component, inject, ViewChild } from '@angular/core';
import { IUser } from '../../Interfaces/user';
import { UserService } from '../../services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  userList: IUser[] = [];
  totalItems = 0;
  pageSize = 5;
  pageIndex = 0;
  userService = inject(UserService);
  router = inject(Router);
  searchControl = new FormControl();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phoneNo',
    'dateofBorth',
    'state',
    'city',
    'gender',
    'password',
    'action',
  ];

  ngOnInit(): void {
    this.loadUsers();
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.pageIndex = 0; // Reset to first page on new search
        this.loadUsers(value);
      });
  }

  editUser(id: number) {
    this.router.navigateByUrl('/user/' + id);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.userList = this.userList.filter((x) => x.id != id);
    });
  }

  loadUsers(searchQuery: string = ''): void {
    this.userService
      .getPagination(this.pageIndex + 1, this.pageSize, searchQuery)
      .subscribe((data) => {
        this.userList = data;
        this.totalItems = data.length;
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers(this.searchControl.value);
  }
}
