import { Component, OnInit } from '@angular/core';
import { StoryService } from '../services/story.service';
import { CharityService } from '../services/charity.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent implements OnInit {

  form: FormGroup;

  constructor(public storyService: StoryService, private charityService: CharityService, private fb: FormBuilder, private toastr: ToastrService) {
    this.form = fb.group({
      'id': [''],
      'description': ['', Validators.compose([Validators.required])],
      'targetAmount': ['', Validators.compose([Validators.required])],
      'timeAllocated': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {

  }

  resetForm(form?: FormGroup) {
    if (form != null)
      form.reset();
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    form.value.organisation = '/organisation/'+ this.charityService.currentCharity.id;
    if (form.value.id == null || form.value.id == '') {
      if (confirm('Are you sure to add this Story?') == true) {
        this.storyService.postStory(form.value).subscribe(data => {
          console.log(data);
          this.resetForm(form);
          this.charityService.getCurrentCharityStories(this.charityService.currentCharity.id);
          this.toastr.success('New record succefully added', 'Add Story');
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastr.error('Error adding Story. Please ensure data is valid\n' + err.error.message, 'Add Story');
          } else {
            this.toastr.error('Error adding Story. Server error\n' + err.error.message, 'Add Story');
          }
        }); 
      }
    } else {
      console.log(form.value);
      if (confirm('Are you sure to update this story\'s details ?') == true) {
        this.storyService.putStory(form.value.id, form.value).subscribe(data => {
          console.log(data);
          // this.resetForm(form);
          this.storyService.setCurrentStory(form.value.id);
          this.toastr.success('Record succefully updated', 'Update Story');
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastr.error('Error updating Story. Please ensure data is valid' + err.error.message, 'Update Story');
          } else {
            this.toastr.error('Error updating Story. Server error\n' + err.error.message, 'Update Story');
          }
        });
      }
    }
  }

}
