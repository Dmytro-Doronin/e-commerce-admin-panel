import {Component, input} from '@angular/core';

@Component({
  selector: 'app-images-array-component',
  imports: [],
  standalone: true,
  templateUrl: './images-array-component.component.html',
  styleUrl: './images-array-component.component.scss'
})
export class ImagesArrayComponentComponent {
  rawImageArray = input<string[]>()

  get imageArray(): string[] {
    const rawArray = this.rawImageArray();
    if (rawArray && rawArray.length > 0) {
      try {
        const cleanJson = rawArray[0]
          .replace(/^[\[\]\s]+|[\[\]\s]+$/g, '')
          .replace(/,\s*$/, '');
        const correctedJson = `[${cleanJson}]`;
        return JSON.parse(correctedJson);
      } catch (error) {
        console.error('Ошибка разбора JSON:', error, rawArray[0]);
      }
    }
    return [];
  }
}
