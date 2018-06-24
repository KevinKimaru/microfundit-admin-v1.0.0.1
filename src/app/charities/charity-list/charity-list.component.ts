import { Component, OnInit } from '@angular/core';
import { CharityService } from '../services/charity.service';
import { Charity } from '../../models/charity.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charity-list',
  templateUrl: './charity-list.component.html',
  styleUrls: ['./charity-list.component.css']
})
export class CharityListComponent implements OnInit {

  constructor(public charityService: CharityService, private router: Router) { }

  ngOnInit() {
    this.charityService.getCharities();
  }

  navigate(charity: Charity) {
    this.charityService.currentCharity = Object.assign({}, charity);
    this.router.navigate(['charities', charity.id]);
    return false;
  }

}
