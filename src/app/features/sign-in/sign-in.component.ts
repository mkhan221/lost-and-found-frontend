import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService, User } from '../../services/users.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent
{
  email = '';
  password = '';
  errorMessage = '';

  constructor(private usersService: UsersService, private router: Router) { }

  signIn()
  {
    this.errorMessage = '';

    this.usersService.login(this.email, this.password).subscribe({
      next: (user: User | null) =>
      {
        if (user)
        {
          console.log('Logged in:', user);
          // Save user to localStorage/sessionStorage if needed
          localStorage.setItem('currentUser', JSON.stringify(user));
          // Redirect to home or dashboard
          this.router.navigate(['/']);
        } else
        {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error: (err) =>
      {
        console.error('Login error', err);
        this.errorMessage = 'Server error during login';
      }
    });
  }
}
