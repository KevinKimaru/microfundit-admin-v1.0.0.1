import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.css']
})
export class BrandLogoComponent implements OnInit {

  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(public brandService: BrandService) { }

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
    this.brandService.postLogo(this.currentFileUpload, this.brandService.currentBrand.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.brandService.getCurrentBrand(this.brandService.currentBrand.id);
      }
    })
    this.selectedFiles = undefined
  }

}
