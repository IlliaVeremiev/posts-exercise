import axios from 'axios';
import type { QNotifyCreateOptions } from 'quasar';

export function apiErrorNotification(error: unknown): QNotifyCreateOptions {
  return errorNotification(getErrorMessage(error));
}

export function errorNotification(message: string): QNotifyCreateOptions {
  return {
    type: 'negative',
    message,
    position: 'top',
    timeout: 5000
  };
}

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error) && error.response?.statusText) {
    return error.response.statusText;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
