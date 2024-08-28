import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { translateToBraille } from './brailleConverter';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './translator.component.html',
  styleUrl: './translator.component.sass'
})
export class TranslatorComponent {

  showOverlay = false;
  
  text: string | null = "";

  translate() {
    const textElement = document.getElementById("latin-text") as HTMLTextAreaElement;
    const resultElement = document.getElementById("braille-text") as HTMLTextAreaElement;

    if (textElement) {
      this.text = textElement.value ?? "";
      resultElement.value = translateToBraille(this.text);
    } else {
      console.log("Translation Failed")
    }
  }

  copyToClipboard() {
    const resultElement = document.getElementById("braille-text") as HTMLTextAreaElement;
    const confirmationElement = document.getElementById("confirmation") as HTMLDivElement;

    // Copy
    resultElement.select();
    navigator.clipboard.writeText(resultElement.value);
    resultElement.blur()

    // Display confirmation div
    confirmationElement.style.display = "flex"
    setTimeout(function() {
      confirmationElement.style.display = "none";
    }, 1500);
  }

  // Importing file
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readFile(file);
    }
  }
  readFile(file: File) {
    const reader = new FileReader();
    const resultElement = document.getElementById("braille-text") as HTMLTextAreaElement;

    reader.onload = (e: any) => {
      const content: string = e.target.result;
      resultElement.value = translateToBraille(content);
      this.showOverlay = false;
    };

    reader.onerror = (e: any) => {
      console.error('Error reading file:', reader.error);
    };
    
    reader.readAsText(file);
  }

  // Exporting file
  downloadBraille() {
    const resultElement = document.getElementById("braille-text") as HTMLTextAreaElement;
    const textContent = resultElement.value;
    const blob = new Blob([textContent], { type: 'text/plain' });

    const anchor = document.createElement('a');
    anchor.download = 'braille.txt';
    anchor.href = (window.URL).createObjectURL(blob);
    anchor.setAttribute('style', 'display: none');
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}