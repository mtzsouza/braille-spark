import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-request-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './request-admin.component.html',
  styleUrl: './request-admin.component.sass'
})
export class RequestAdminComponent {
  auth = inject(AuthService);
  database = inject(FirestoreService);

  formData = {
    "requestCode": "",
  }

  onSubmit() {
    this.database.fetchDocumentById("settings", "administration")
    .then(data => {
      if (data.codes.includes(this.formData.requestCode)) {
        const email = this.auth.getEmail()!;
        let adminsList = data.admins;
        adminsList.push(email);
        console.log(adminsList);
        this.database.updateField("users", email, "admin", true);
        this.database.updateField("settings", "administration", "admins", adminsList)
        alert("You are now an admin.")
      } else {
        alert("Failed to grant admin privilege.");
      }
    })
    .catch(error => {
      console.error("Error validating request code:", error)
    });
  }
}
