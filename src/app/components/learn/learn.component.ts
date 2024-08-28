import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { CharacterCardComponent } from './character-card/character-card.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, CharacterCardComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.sass'
})
export class LearnComponent {
  // Preparing client
  constructor(private http: HttpClient, private router: Router) {}
  endpoint = ''

  modules: any;
  moduleSelected = "";
  addModulePanel = false;
  isAdmin = false;

  // Receiving admin status and modules when opening the page
  userID = localStorage.getItem('id');
  
  loadModules() {
    this.endpoint = 'https://braille-spark-server.onrender.com/aegis-backend/' + this.userID + '/modules'
    this.http.get(this.endpoint)
      .subscribe((response) => {
        this.modules = response;
      }, (error) => {
        console.log(error.Message)
      });
  };

  checkAdmin() {
    this.endpoint = 'https://braille-spark-server.onrender.com/aegis-backend/' + this.userID + '/checkAdmin'
    this.http.get(this.endpoint)
      .subscribe((response) => {
        if (response) {
          this.isAdmin = true
        }
      }, (error) => {
        console.log(error.Message)
      });
  }

  ngOnInit() {
    this.loadModules();
    this.checkAdmin();
  }

  getName(id: string) {
    for (let item of this.modules) {
      if (id == item.id) {
        return item.moduleName
      }
    }
    return ""
  }

  getContent(id: string) {
    for (let item of this.modules) {
      if (id == item.id) {
        return item.moduleContent
      }
    }
    return ""
  }

  getCharacters(id: string) {
    for (let item of this.modules) {
      if (id == item.id) {
        return item.character
      }
    }
    return ""
  }

  // Add Module
  formData = {
    "name": "",
    "character": "",
    "content": ""
  }
  addModule() {
    this.endpoint = 'https://braille-spark-server.onrender.com/aegis-backend/' + this.userID + '/addModule'
    this.http.post(this.endpoint, this.formData)
      .subscribe((response) => {
        window.location.reload()
      }, (error) => {
        console.log(error.Message)
      });
  }

  // Delete Module
  deleteModule(moduleID: string) {
    this.endpoint = 'https://braille-spark-server.onrender.com/aegis-backend/' + this.userID + '/deleteModule/' + moduleID
    this.http.delete(this.endpoint)
      .subscribe((response) => {
        window.location.reload()
      }, (error) => {
        console.log(error.Message)
      });
  }
}
