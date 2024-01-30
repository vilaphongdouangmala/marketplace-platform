import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { BrowserStorageService } from '../../services/brower-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  authService = inject(AuthService);
  browserStorageService = inject(BrowserStorageService);
  router = inject(Router);

  loginFormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
    ]),
  });

  isPasswordVisible: boolean = false;

  onLogin() {
    const { username, password } = this.loginFormGroup.value;
    if (this.loginFormGroup.invalid || !username || !password) {
      return;
    }
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.browserStorageService.setAuthUser(res);
        this.router.navigate(['/chat']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
