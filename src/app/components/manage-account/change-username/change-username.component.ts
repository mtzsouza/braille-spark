import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-change-username',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-username.component.html',
  styleUrl: './change-username.component.sass'
})
export class ChangeUsernameComponent {
  auth = inject(AuthService);

  formData = {
    "newUsername": ""
  }

  onSubmit() {
    this.auth.updateUsername(this.formData.newUsername);
    alert("Username successfully changed.");
  }
}
