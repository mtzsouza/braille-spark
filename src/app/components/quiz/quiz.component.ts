import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModuleService } from '../../services/module.service';
import { QuizInterface } from '../../utils/module.interface';
import { buildQuiz } from '../../utils/QuizBuilder';
import { QuizCardComponent } from './quiz-card/quiz-card.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuizCardComponent, CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  moduleService = inject(ModuleService);
  fb = inject(FormBuilder);


  quiz!: QuizInterface;
  moduleId = this.route.snapshot.paramMap.get('id') || '';
  quizForm!: FormGroup;

  ngOnInit() {
    this.moduleService.getModuleById(this.moduleId).then(module => {
      this.quiz = buildQuiz(module!); 
      this.buildQuizForm(); // Build the form once the quiz is available
    });
  }

  // Dynamically create form controls for each question
  buildQuizForm() {
    const group: any = {};

    this.quiz.questions.forEach((question, index) => {
      group[`question${index}`] = new FormControl('');
    });

    this.quizForm = this.fb.group(group);
  }

  onSubmit() {
    let allCorrect = true; // Flag to check if all answers are correct
    const formValues = this.quizForm.value; // Get form values
  
    this.quiz.questions.forEach((question, index) => {
      const selectedAnswer = formValues[`question${index}`]; // Get the selected answer for the question
  
      // Find the selected option in the question's options array
      const selectedOption = question.options.find(option => option.answer === selectedAnswer);
  
      // Check if the selected option is correct
      if (!selectedOption || !selectedOption.isCorrect) {
        allCorrect = false; // If any answer is incorrect, set flag to false
      }
    });
  
    if (allCorrect) {
      alert('Congratulations! You can advance to the next module.');
      this.authService.levelUp(this.moduleId).then(() => {
        this.router.navigate(["/learn"]);
      })
    } else {
      alert('You failed the quiz. Revise the lesson and try again.');
      this.router.navigate(["/learn"]);
    }
  }  
}
