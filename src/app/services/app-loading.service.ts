import {Injectable, signal} from '@angular/core';
import {IAlert} from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root',
})

export class AppLoadingService {
  private appLoadingSignal = signal<boolean>(false)
  private appTitleSignal = signal<{title: string, count: number | null}>({title: '', count: null})
  private alertSignal = signal<IAlert | null>({message: '', severity: null})
  private timerId: any = null

  get appLoading() {
    return this.appLoadingSignal
  }
  get titleData() {
    return this.appTitleSignal
  }

  get alert() {
    return this.alertSignal
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

  setAlert({ message, severity }: IAlert, timeout: number = 5000) {
    this.alertSignal.set({message, severity})

    if (this.timerId) {
      clearTimeout(this.timerId)
    }

    this.timerId = setTimeout(() => {
      this.clearError()
    }, timeout)
  }

  clearError() {
    this.alertSignal.set(null);
    this.timerId = null;
  }
}
