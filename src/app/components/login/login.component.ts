import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Roles } from 'src/app/model';
import { User } from 'src/app/modules/user/model/user.model';
import { AuthService, LocalStorageService } from 'src/app/shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users!: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { this.formInitializer() }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    this.authService.login(this.loginForm.getRawValue());

    this.authService.loginStatus$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  private formInitializer(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
