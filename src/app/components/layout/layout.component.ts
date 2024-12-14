import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  userRole!: string | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getCurrentLoginUserRole();
  }

  hasRole(role: string): boolean {
    return this.userRole === role;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
