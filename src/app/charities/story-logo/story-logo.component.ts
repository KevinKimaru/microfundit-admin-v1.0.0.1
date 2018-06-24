import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from '../services/story.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-story-logo',
  templateUrl: './story-logo.component.html',
  styleUrls: ['./story-logo.component.css']
})
export class StoryLogoComponent implements OnInit {

  @Input() isLogo: boolean;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(public storyService: StoryService) { }

  ngOnInit() {
  }

  selectFile(event) {
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    if (this.isLogo) {
      this.storyService.postLogo(this.currentFileUpload, this.storyService.currentStory.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.storyService.setCurrentStory(this.storyService.currentStory.id);
        }
      })
    } else {
      this.storyService.postImage(this.currentFileUpload, this.storyService.currentStory.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.storyService.getCurrentStoryImages(this.storyService.currentStory.id);
        }
      })
    }

    this.selectedFiles = undefined
  }


}
