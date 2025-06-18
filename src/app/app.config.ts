import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { Home } from './home/home';
import { YoutubeDownloader } from './youtube-downloader/youtube-downloader';
import { FileConverter } from './file-converter/file-converter';
import { PdfTools } from './pdf-tools/pdf-tools';

export const API_URL = 'https://your-backend.onrender.com'; // <-- Add your API URL here

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: Home },
      { path: 'youtube-downloader', component: YoutubeDownloader },
      { path: 'file-converter', component: FileConverter },
      { path: 'pdf-tools', component: PdfTools }
    ], withComponentInputBinding())
  ]
};
