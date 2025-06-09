import {Http, HttpHeaders} from 'dff-util';
import AppStorage, {TOKEN} from './app.storage';

export default class AppHttp {
  private static instance: AppHttp;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AppHttp();
      Http.API_BASE_URL = 'https://apidev.module.org';
    }
    return this.instance;
  }
  static async Load(
    id: string,
    params?: Record<string, string | number | boolean>,
  ) {
    const headers = {
      ...HttpHeaders,
      ['Content-Type']: 'application/json',
    };
    return await Http.Get(`/module-sor/load/${id}`, params, headers);
  }

  static async Get(
    url: string,
    params: Record<string, string | number | boolean>,
  ) {
    const headers = {
      ...HttpHeaders,
      ['Content-Type']: 'application/json',
      authorization: AppStorage.getData(TOKEN) || '',
    };
    return await Http.Get(url, params, headers);
  }

  static async Post(url: string, params: any) {
    const headers = {
      ...HttpHeaders,
      ['Content-Type']: 'application/json',
      authorization: AppStorage.getData(TOKEN) || '',
    };
    return await Http.Post(url, params, headers);
  }

  static async CloudUpload(url: string, file: File) {
    return await Http.CloudUpload(url, file);
  }
}

export const MsUrl = {};

export const URLEndPoints = {};
