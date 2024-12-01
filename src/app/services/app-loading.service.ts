import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AppLoadingService {
  private appLoadingSignal = signal<boolean>(false)
  private appTitleSignal = signal<{title: string, count: number | null}>({title: '', count: null})

  get appLoading() {
    return this.appLoadingSignal
  }
  get titleData() {
    return this.appTitleSignal
  }
  appTitle(title: string, count: number | null) {
    this.appTitleSignal.set({title, count})
  }

  show() {
    this.appLoadingSignal.set(true)
  }

  hide() {
    this.appLoadingSignal.set(false)
  }

}
