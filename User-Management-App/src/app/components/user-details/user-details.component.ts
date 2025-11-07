import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-user-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  svc = inject(UserService);
  id = 0;

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.svc.users().length) this.svc.loadUsers();
  }
}
