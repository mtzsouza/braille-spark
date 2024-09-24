import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { AuthService } from '../../services/auth.service';
import { ModuleService } from '../../services/module.service';
import { ModuleInterface } from '../../utils/module.interface';
import { Router } from '@angular/router';
import { response } from 'express';
import Module from 'node:module';

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
  router = inject(Router)

  modules: any; 
  moduleSelected: any;
  currentPage = 0;
  showAddModule = false;
  isAdmin = false;
  userLevel = 0;
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

    // Check user level
    this.authService.getLevel()
    .then(response => {
      this.userLevel = response;
    })
    .catch(error => {
      console.error('Error checking user level:', error);
    })

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

  startModule(module: ModuleInterface): void {
    this.showAddModule = false;
    this.currentPage = 0;
    if (this.userLevel >= Number(module.id)) {
      this.moduleSelected = module;
    } else {
      const lockedModule: ModuleInterface = {
        name: "Locked Module",
        content: [{text: "You must finish the previous module to level up, then you'll gain access to this module."}],
        characters: "locked",
        creator: "",
        id: ""
       }
      this.moduleSelected = lockedModule;
    }
  }

  startQuiz() {
    this.router.navigate(["/quiz", this.moduleSelected.id])
  }
}
