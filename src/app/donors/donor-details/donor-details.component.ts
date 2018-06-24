import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonorService } from '../services/donor.service';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css']
})
export class DonorDetailsComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute, public donorService: DonorService) {
    route.params.subscribe(params => { this.id = params['donor']; });
  }

  ngOnInit() {
    this.donorService.setCurrentDonor(parseInt(this.id));
    this.donorService.getCurrentDonorDonations(parseInt(this.id));
  }

}
