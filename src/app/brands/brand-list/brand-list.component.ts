import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../../models/brand.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  constructor(public brandService: BrandService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.brandService.getBrands();
  }

  navigate(brand: Brand) {
    this.brandService.currentBrand = Object.assign({}, brand);
    this.router.navigate(['brands', brand.id]);
    return false;
  }

}
