import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-change-username',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-username.component.html',
  styleUrl: './change-username.component.sass'
})
export class ChangeUsernameComponent {
  // Submit form
  formData = {
    "newUsername": ""
  }

  // User ID
  userID = localStorage.getItem('id');

  constructor(private http: HttpClient, private router: Router) {}
  endpoint = 'https://braille-spark-server.onrender.com/aegis-backend/' + this.userID + '/manage-account/editUsername'
  onSubmit() {
    this.http.put(this.endpoint, this.formData)
      .subscribe((response) => {
        window.location.href = "dashboard"
        alert("Username Changed")
      }, (error) => {
        console.log(error.Message)
        alert("Failed to change username")
      });
  }
}
