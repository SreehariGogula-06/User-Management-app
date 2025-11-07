import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="header">
      <h1 class="title">👥 User Management Portal</h1>
      <nav class="nav">
        <a routerLink="/users" routerLinkActive="active">Users</a>
        <a routerLink="/add" routerLinkActive="active">Add User</a>
      </nav>
    </header>

    <main class="container">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <p>© {{ currentYear }} User Management Portal</p>
    </footer>
  `,
  styles: [`
    /* --- Header --- */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: linear-gradient(90deg, #2563eb, #1d4ed8);
      color: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .title {
      font-size: 1.5rem;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .nav a {
      color: #fff;
      text-decoration: none;
      margin-left: 1.5rem;
      font-weight: 500;
      position: relative;
      transition: color 0.2s ease-in-out;
    }

    .nav a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0%;
      height: 2px;
      background: #fff;
      transition: width 0.25s ease-in-out;
    }

    .nav a:hover::after,
    .nav a.active::after {
      width: 100%;
    }

    .nav a:hover {
      color: #e0e7ff;
    }

    /* --- Main container --- */
    .container {
      padding: 2rem;
      max-width: 960px;
      margin: 0 auto;
      min-height: calc(100vh - 160px);
      background-color: #f9fafb;
    }

    /* --- Footer --- */
    .footer {
      text-align: center;
      padding: 1rem;
      font-size: 0.9rem;
      background: #f3f4f6;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
    }

    /* --- Responsive --- */
    @media (max-width: 600px) {
      .header {
        flex-direction: column;
        gap: 0.75rem;
        text-align: center;
      }
      .nav a {
        margin: 0 0.75rem;
      }
      .container {
        padding: 1rem;
      }
    }
  `]
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}
