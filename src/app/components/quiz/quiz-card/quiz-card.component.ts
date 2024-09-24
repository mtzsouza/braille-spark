import { Component, Input } from '@angular/core';
import { translateToBraille } from '../../../utils/BrailleTranslator';

@Component({
  selector: 'app-quiz-card',
  standalone: true,
  imports: [],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.sass'
})
export class QuizCardComponent {
  @Input() character: string = "";

  translate(s: string) {
    return translateToBraille(s);
  }
}
