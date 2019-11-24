import uuid from 'uuid'

export enum ToastSeverity {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export enum ToastIcon {
  SUCCESS = 'mdi-check-circle-outline',
  INFO = 'mdi-information-outline',
  WARNING = 'mdi-alert',
  ERROR = 'mdi-alert-circle-outline',
}

export enum ToastDelay {
  SUCCESS = 3000,
  INFO = 4000,
  WARNING = 5000,
  ERROR = 6000,
}

interface ToastData {
  severity: ToastSeverity;
  icon: ToastIcon;
  text: string;
  delay: number
}

export default class Toast implements ToastData {
  id: string;
  timestamp: number;
  severity: ToastSeverity;
  icon: ToastIcon;
  text: string;
  delay: number

  constructor ({ severity, icon, text, delay }: ToastData) {
    this.id = uuid.v4()
    this.timestamp = Date.now()
    this.severity = severity
    this.icon = icon
    this.text = text
    this.delay = delay
  }
}

export class SuccessToast extends Toast {
  constructor (text: string) {
    super({
      text,
      severity: ToastSeverity.SUCCESS,
      icon: ToastIcon.SUCCESS,
      delay: ToastDelay.SUCCESS
    })
  }
}

export class InfoToast extends Toast {
  constructor (text: string) {
    super({
      text,
      severity: ToastSeverity.INFO,
      icon: ToastIcon.INFO,
      delay: ToastDelay.INFO
    })
  }
}

export class WarningToast extends Toast {
  constructor (text: string) {
    super({
      text,
      severity: ToastSeverity.WARNING,
      icon: ToastIcon.WARNING,
      delay: ToastDelay.WARNING
    })
  }
}

export class ErrorToast extends Toast {
  constructor (text: string) {
    super({
      text,
      severity: ToastSeverity.ERROR,
      icon: ToastIcon.ERROR,
      delay: ToastDelay.ERROR
    })
  }
}
