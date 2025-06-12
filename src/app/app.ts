import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  // Remove styleUrl: './styles.css' since it's now global
})
export class App {
  selectedTool: string | null = null;
  tools = ['Merge', 'Split', 'Compress', 'Rotate', 'Extract'];
  youtubeLink: string = '';
  showPopup: boolean = false;
  videoTitle: string = 'Sample Video';
  thumbnailUrl: string = 'https://via.placeholder.com/120x90';
  qualities: string[] = ['1080p', '720p', '480p', '360p', '240p', 'MP3'];

  selectTool(tool: string) {
    this.selectedTool = this.selectedTool === tool ? null : tool;
  }

  onSubmitLink(event: Event) {
    if (this.selectedTool === 'youtube' && this.youtubeLink) {
      event.preventDefault();
      this.showPopup = true;
    }
  }
}