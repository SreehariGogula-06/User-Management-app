import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  svc = inject(UserService);
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
     this.svc.loadUsers();
  }

  ngAfterViewInit() {
    this.searchInput?.nativeElement?.focus();
  }

  /** Handle search input cleanly */
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.svc.searchTerm.set(input.value);
  }

  confirmDelete(id: number) {
    if (confirm('Delete this user?')) this.svc.deleteUser(id);
  }
}
