import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly url = 'https://jsonplaceholder.typicode.com/users';

  // signals for state management
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');

  // computed for live filtering
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.users();
    return this.users().filter(u =>
      [u.name, u.email, u.username, u.company?.name]
        .filter(Boolean)
        .some(v => v!.toLowerCase().includes(term))
    );
  });

  constructor(private http: HttpClient) {
    // watch for errors
    effect(() => {
      if (this.error()) console.error('UserService error:', this.error());
    });
  }

  async loadUsers() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(this.http.get<User[]>(this.url));
      this.users.set(data);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to load users');
    } finally {
      this.loading.set(false);
    }
  }

  // ...rest of the code remains the same


  async addUser(user: Omit<User, 'id'>) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const newUser = await firstValueFrom(
        this.http.post<User>(this.url, user)
      );
      this.users.update(list => [...list, newUser]);
      return newUser;
    } catch (err: any) {
      this.error.set(err.message || 'Failed to add user');
      throw err;
    } finally {
      this.loading.set(false);
    }
  }

  async updateUser(id: number, patch: Partial<User>) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const updatedUser = await firstValueFrom(
        this.http.put<User>(`${this.url}/${id}`, patch)
      );
      this.users.update(list => 
        list.map(u => u.id === id ? { ...u, ...updatedUser } : u)
      );
      return updatedUser;
    } catch (err: any) {
      this.error.set(err.message || 'Failed to update user');
      throw err;
    } finally {
      this.loading.set(false);
    }
  }

  async deleteUser(id: number) {
    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(
        this.http.delete(`${this.url}/${id}`)
      );
      this.users.update(list => list.filter(u => u.id !== id));
    } catch (err: any) {
      this.error.set(err.message || 'Failed to delete user');
      throw err;
    } finally {
      this.loading.set(false);
    }
  }

  getById(id: number) {
    return this.users().find(u => u.id === id) || null;
  }
}
