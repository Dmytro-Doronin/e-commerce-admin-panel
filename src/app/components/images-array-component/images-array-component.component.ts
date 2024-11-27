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
        if (Array.isArray(rawArray)) {
          return rawArray
        }

        const jsonString = (rawArray[0] as string).trim();

        return JSON.parse(jsonString)
      } catch (error) {
        console.error('Ошибка разбора JSON:', error, rawArray[0]);
      }
    }
    return [];
  }
}
