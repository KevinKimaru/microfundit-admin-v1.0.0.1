import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { BrandService } from './services/brand.service';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand.model';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
    
  }

}
