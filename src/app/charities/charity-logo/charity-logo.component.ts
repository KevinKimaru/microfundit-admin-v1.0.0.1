import { Component, OnInit } from '@angular/core';
import { CharityService } from '../services/charity.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-charity-logo',
  templateUrl: './charity-logo.component.html',
  styleUrls: ['./charity-logo.component.css']
})
export class CharityLogoComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(public charityService: CharityService) { }

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
      this.charityService.postLogo(this.currentFileUpload, this.charityService.currentCharity.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          this.charityService.setCurrentCharity(this.charityService.currentCharity.id);
        }
      })
    this.selectedFiles = undefined
  }
}
