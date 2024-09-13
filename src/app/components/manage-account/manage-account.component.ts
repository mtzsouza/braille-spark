import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RequestAdminComponent } from './request-admin/request-admin.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NavbarComponent, ChangeUsernameComponent, ChangePasswordComponent, RequestAdminComponent],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.sass'
})

export class ManageAccountComponent {
  // Injections
  router = inject(Router);
  authService = inject(AuthService);

  currentPanel = ""

  changePanel(panel: string) {
    this.currentPanel = panel
  }

  async logout() : Promise<void> {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 200);
  }
}
