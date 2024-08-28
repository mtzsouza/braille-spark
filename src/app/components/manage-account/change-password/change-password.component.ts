import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.sass'
})
export class ChangePasswordComponent {
    // Submit form
    formData = {
      "oldPassword": "",
      "newPassword": "",
      "confirmPassword": ""
    }

    // User ID
    userID = localStorage.getItem('id');

    constructor(private http: HttpClient, private router: Router) {}
    endpoint = 'https://braille-spark-server.onrender.com/aegis-backend/' + this.userID + '/manage-account/editPassword'
    onSubmit() {
      this.http.put(this.endpoint, this.formData)
        .subscribe((response) => {
          window.location.href = "dashboard"
          alert("Password Changed")
        }, (error) => {
          console.log(error.Message)
          alert("Failed to change password")
        });
    }
}
