import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-request-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './request-admin.component.html',
  styleUrl: './request-admin.component.sass'
})
export class RequestAdminComponent {
    // Submit form
    formData = {
      "requestCode": "",
    }

    // User ID
    userID = localStorage.getItem('id');

  constructor(private http: HttpClient, private router: Router) {}
  endpoint = 'https://braille-spark-server.onrender.com/aegis-backend/' + this.userID + '/requestadmin'
  onSubmit() {
    this.http.put(this.endpoint, this.formData)
      .subscribe((response) => {
        alert("Privilege Granted")
        window.location.href = "dashboard"
      }, (error) => {
        console.log(error.Message)
        alert("Failed to request admin privilege")
      });
  }
}
