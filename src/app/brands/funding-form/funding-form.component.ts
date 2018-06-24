import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FundingService } from '../services/funding.service';
import { BrandService } from '../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-funding-form',
  templateUrl: './funding-form.component.html',
  styleUrls: ['./funding-form.component.css']
})
export class FundingFormComponent implements OnInit {

  form: FormGroup;

  constructor(public fundingService: FundingService, private brandService: BrandService, private fb: FormBuilder, private toastr: ToastrService) {
    this.form = fb.group({
      'id': [''],
      'placedAmount': ['', Validators.compose([Validators.required])],
      'ratio': ['', Validators.compose([Validators.required])]
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
    form.value.brand = '/brand/'+ this.brandService.currentBrand.id;
    if (form.value.id == null || form.value.id == '') {
      if (confirm('Are you sure to add this funding?') == true) {
        this.fundingService.postFunding(form.value).subscribe(data => {
          console.log(data);
          this.resetForm(form);
          this.brandService.getBrandFundings(this.brandService.currentBrand.id);
          this.toastr.success('New record succefully added', 'Add Funding');
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastr.error('Error adding Funding. Please ensure data is valid\n' + err.error.message, 'Add Funding');
          } else {
            this.toastr.error('Error adding Funding. Server error\n' + err.error.message, 'Add Funding');
          }
        }); 
      }
    } else {
      console.log(form.value);
      if (confirm('Are you sure to update this funding\'s details ?') == true) {
        this.fundingService.putFunding(form.value.id, form.value).subscribe(data => {
          console.log(data);
          // this.resetForm(form);
          this.fundingService.setCurrentFunding(form.value.id);
          this.toastr.success('Record succefully updated', 'Update Funding');
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastr.error('Error updating Funding. Please ensure data is valid' + err.error.message, 'Update Funding');
          } else {
            this.toastr.error('Error updating Funding. Server error\n' + err.error.message, 'Update Funding');
          }
        });
      }
    }
  }

}
