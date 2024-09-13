import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.sass'
})
export class ChangePasswordComponent {
    auth = inject(AuthService);
    router = inject(Router);

    formData = {
      "oldPassword": "",
      "newPassword": "",
      "confirmPassword": ""
    }

    onSubmit() {
      this.auth.resetPassword(this.auth.getEmail()!);
      alert("Password reset email sent. You'll be logged out now.");
      this.auth.logout();
      this.router.navigateByUrl("/login");
    }
}
