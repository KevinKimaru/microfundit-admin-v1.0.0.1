import { Component, OnInit } from '@angular/core';
import { DonorService } from '../services/donor.service';
import { Router } from '@angular/router';
import { Donor } from '../../models/donor.model';

@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css']
})
export class DonorListComponent implements OnInit {

  constructor(private router: Router, public donorService: DonorService) { }

  ngOnInit() {
    this.donorService.getDonors();
  }

  navigate(donor: Donor) {
    this.donorService.setCurrentDonor(donor.id);
    this.router.navigate(['donors', donor.id]);
  }

}
