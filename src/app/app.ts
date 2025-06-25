import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YtubeService } from './ytube.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
})
export class App {
  selectedTool: string | null = null;
  youtubeLink: string = '';
  showPopup: boolean = false;
  videoInfo: any = null;
  qualities: any[] = [];
  chosenQuality: string = 'best';
  downloadError: string = '';

  constructor(private ytube: YtubeService) {}

  selectTool(tool: string) {
    this.selectedTool = this.selectedTool === tool ? null : tool;
  }

  onSubmitLink(event: Event) {
    if (this.selectedTool === 'youtube' && this.youtubeLink) {
      event.preventDefault();
      this.showPopup = true;
      this.downloadError = '';
      this.ytube.getVideoInfo(this.youtubeLink).subscribe({
        next: (info) => {
          this.videoInfo = info;
          this.qualities = info.formats || [];
        },
        error: (err) => {
          this.downloadError = 'Failed to fetch video info.';
        }
      });
    }
  }

  onDownload() {
    if (!this.youtubeLink) return;
    this.downloadError = '';
    this.ytube.downloadVideo(this.youtubeLink, this.chosenQuality).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = (this.videoInfo?.title || 'video') + '.mp4';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.downloadError = 'Download failed.';
      }
    });
  }
}
