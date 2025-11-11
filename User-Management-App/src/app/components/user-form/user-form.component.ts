import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  svc = inject(UserService);

  id = 0;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    username: [''],
    phone: ['',[Validators.required, Validators.minLength(10)]],
    website: [''],
    companyName: ['']
  });

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
    if (!this.svc.users().length) this.svc.loadUsers();

    if (this.id) {
      const u = this.svc.getById(this.id);
      if (u) {
        this.form.patchValue({
          name: u.name,
          email: u.email,
          username: u.username,
          phone: u.phone,
          website: u.website,
          companyName: u.company?.name || ''
        });
      }
    }
  }

  save() {
    if (this.form.invalid) return;

    const v = this.form.value;
    if (this.id) {
      this.svc.updateUser(this.id, {
        name: v.name!,
        email: v.email!,
        username: v.username || undefined,
        phone: v.phone!,
        website: v.website || undefined,
        company: v.companyName ? { name: v.companyName } : undefined
      });
    } else {
      this.svc.addUser({
        name: v.name!,
        email: v.email!,
        username: v.username || undefined,
        phone: v.phone!,
        website: v.website || undefined,
        company: v.companyName ? { name: v.companyName } : undefined
      });
    }
    this.router.navigate(['/users']);
  }
}
