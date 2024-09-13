import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {  
  database = inject(FirestoreService);
  auth = inject(AuthService);

  ngOnInit() {
    
  }

}