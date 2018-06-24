import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Brand } from '../../models/brand.model';
import { BrandService } from '../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {

  form: FormGroup;

  constructor(public brandService: BrandService, private fb: FormBuilder, private toastr: ToastrService) { 
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
      if (confirm('Are you sure to add this new Brand ?') == true) {
        this.brandService.postBrand(form.value).subscribe(data => {
          console.log(data);
          this.resetForm(form);
          this.brandService.getBrands();
          this.toastr.success('New record succefully added', 'Add Brand');
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastr.error('Error adding brand. Please ensure data is valid' + err.error.message, 'Add Brand');
          } else {
            this.toastr.error('Error adding brand. Server error\n' + err.error.message, 'Add Brand');
          }
        });
      }
    } else {
      console.log(form.value);
      if (confirm('Are you sure to update this brand\'s details ?') == true) {
        this.brandService.putBrand(form.value.id, form.value).subscribe(data => {
          console.log(data);
          // this.resetForm(form);
          this.brandService.getCurrentBrand(form.value.id);
          this.toastr.success('Record succefully updated', 'Update Brand');
        }, (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastr.error('Error updating Brand. Please ensure data is valid' + err.error.message, 'Update Brand');
          } else {
            this.toastr.error('Error updating Brand. Server error\n' + err.error.message, 'Update Brand');
          } 
        });
      }
    }
  }

}
