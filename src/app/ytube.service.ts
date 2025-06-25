import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class YtubeService {
  // Change the URL below to your Render backend URL (no trailing slash)
  backendUrl = 'https://ytube-90a5.onrender.com';

  constructor(private http: HttpClient) {}

  getVideoInfo(url: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/api/info`, {
      params: new HttpParams().set('url', url),
    });
  }

  downloadVideo(url: string, formatId: string = 'best'): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/download`, {
      params: new HttpParams().set('url', url).set('format_id', formatId),
      responseType: 'blob',
    });
  }
}
