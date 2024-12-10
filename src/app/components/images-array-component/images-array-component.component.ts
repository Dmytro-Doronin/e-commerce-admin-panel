import {ChangeDetectorRef, Component, Input, input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-images-array-component',
  imports: [],
  standalone: true,
  templateUrl: './images-array-component.component.html',
  styleUrl: './images-array-component.component.scss'
})

export class ImagesArrayComponentComponent implements OnInit {
  @Input() rawImageArray: string[] = [];
  sanitizedImages: SafeUrl[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sanitizedImages = this.parseAndSanitizeImageArray(this.rawImageArray);
  }

  private parseAndSanitizeImageArray(rawArray: string[]): SafeUrl[] {
    if (!rawArray || rawArray.length === 0) {
      return [];
    }

    try {
      if (Array.isArray(rawArray) && rawArray.every((item) => this.isValidUrl(item.trim()))) {
        return rawArray.map((url) => this.sanitizer.bypassSecurityTrustUrl(url.trim()))
      }

      const combinedString = rawArray.join('')

      const correctedString = combinedString.replace(/""/g, '","')

      const cleanedString = correctedString
        .replace(/^\[\"|\"\]$/g, '')
        .replace(/"/g, '')

      const urls = cleanedString.split(',').filter((url) => url.trim().length > 0)

      return urls.map((url) => this.sanitizer.bypassSecurityTrustUrl(url.trim()))
    } catch (error) {
      return []
    }
  }

  private isValidUrl(url: string): boolean {
    const urlPattern = /^(https?:\/\/)[^\s]+\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i
    return urlPattern.test(url)
  }
}
// export class ImagesArrayComponentComponent {
//
//   rawImageArray = input<string[]>();
//   get imageArray(): string[] {
//     const rawArray = this.rawImageArray();
//     if (rawArray && rawArray.length > 0) {
//       try {
//         if (Array.isArray(rawArray)) {
//           return rawArray.map((item) => {
//             try {
//               return JSON.parse(item)
//             } catch {
//               return item.trim()
//             }
//           }).flat()
//         }
//
//         const jsonString = (rawArray as string).trim();
//         return JSON.parse(jsonString);
//       } catch (error) {
//         console.error('Ошибка разбора JSON:', error, rawArray);
//       }
//     }
//     return [];
//   }
// }
