import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from '../services/story.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-story-images',
  templateUrl: './story-images.component.html',
  styleUrls: ['./story-images.component.css']
})
export class StoryImagesComponent implements OnInit {

  @Input() fileUpload: string;

  constructor(public storyService: StoryService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  deleteImg() {
    console.log(this.fileUpload);
    let partsArr = this.fileUpload.split('/');
    let imageName = partsArr[partsArr.length - 1];
    if (confirm("Are you sure you want to delete this image?") == true) {
      this.storyService.deleteImage(this.storyService.currentStory.id, imageName).subscribe(res => {
        this.toastr.warning("Successfully Deleted image", "Delete Image");
        this.storyService.getCurrentStoryImages(this.storyService.currentStory.id);
      }, (err: HttpErrorResponse) => {
        // this.toastr.error("Error deleting image: \n" + err.error.message, "Delete Image");
        this.storyService.getCurrentStoryImages(this.storyService.currentStory.id);
      });
    }
    return false;
  }

}
