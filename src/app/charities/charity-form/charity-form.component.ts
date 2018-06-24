import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CharityService } from '../services/charity.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-charity-form',
  templateUrl: './charity-form.component.html',
  styleUrls: ['./charity-form.component.css']
})
export class CharityFormComponent implements OnInit {

  form: FormGroup;

  constructor(public charityService: CharityService, private fb: FormBuilder, private toastr: ToastrService) {
    this.form = fb.group({
      'id': [''],
      'name': ['', Validators.compose([Validators.required])],
      'description': ['', Validators.compose([Validators.required])]
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
    if (form.value.id == null || form.value.id == '') {
      if (confirm('Are you sure to add this charity?') == true) {
        this.charityService.postCharity(form.value).subscribe(data => {
          console.log(data);
          this.resetForm(form);
          this.charityService.getCharities();
          this.toastr.success('New record succefully added', 'Add Charity');
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastr.error('Error adding Charity. Please ensure data is valid\n' + err.error.message, 'Add Charity');
          } else {
            this.toastr.error('Error adding Charity. Server error\n' + err.error.message, 'Add Charity');
          }
        });
      }
    } else {
      console.log(form.value);
      if (confirm('Are you sure to update this charity\'s details ?') == true) {
        this.charityService.putCharity(form.value.id, form.value).subscribe(data => {
          console.log(data);
          // this.resetForm(form);
          this.charityService.setCurrentCharity(form.value.id);
          this.toastr.success('Record succefully updated', 'Update Charity');
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastr.error('Error updating Charity. Please ensure data is valid' + err.error.message, 'Update Charity');
          } else {
            this.toastr.error('Error updating Charity. Server error\n' + err.error.message, 'Update Charity');
          }
        });
      }
    }
  }

}
