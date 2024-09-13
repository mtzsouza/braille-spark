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
    if (this.formData.requestCode == "please") {
      const id = this.auth.getEmail()!;
      this.database.updateField("users", id, "admin", true);
      alert("You are now an admin.")
    } else {
      alert("Failed to grant admin privilege.");
    }
  }
}
