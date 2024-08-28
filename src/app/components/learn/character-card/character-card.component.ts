import { Component, Input } from '@angular/core';
import { translateToBraille } from '../../translator/brailleConverter';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.sass'
})
export class CharacterCardComponent {
  @Input() character: string = "";

  translate(s: string) {
    return translateToBraille(s);
  }
}
