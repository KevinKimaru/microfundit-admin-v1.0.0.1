import { Component, OnInit, Input } from '@angular/core';
import { Brand } from '../../models/brand.model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  @Input() brand: Brand;

  constructor() { }

  ngOnInit() {
  }

}
