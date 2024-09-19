import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { AuthService } from '../../services/auth.service';
import { ModuleService } from '../../services/module.service';
import { ModuleInterface } from '../../utils/module.interface';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, CharacterCardComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.sass'
})
export class LearnComponent {
  authService = inject(AuthService);
  moduleService = inject(ModuleService);

  modules: any; 
  moduleSelected: any;
  currentPage = 0;
  showAddModule = false;
  isAdmin = false;
  newModuleContent = [{text: ''}];

  ngOnInit() {
    // Check Admin status
    this.authService.isAdmin()
        .then(response => {
            this.isAdmin = response;
        })
        .catch(error => {
            console.error('Error checking admin status:', error);
        });

    // Load modules
    this.moduleService.getModules()
        .then(data => {
          this.modules = data;
        })
        .catch(error => {
          console.error('Error loading modules:', error);
        });
  }

  moduleData: ModuleInterface = {
    "name": "",
    "content": this.newModuleContent,
    "characters": "",
    "creator": this.authService.getEmail()!,
    "id": ""
  }
}
