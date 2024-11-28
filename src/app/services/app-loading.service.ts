import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AppLoadingService {
  private appLoadingSignal = signal<boolean>(false)

  get appLoading() {
    return this.appLoadingSignal
  }

  show() {
    this.appLoadingSignal.set(true)
  }

  hide() {
    this.appLoadingSignal.set(false)
  }

}
