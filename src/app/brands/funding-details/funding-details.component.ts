import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FundingService } from '../services/funding.service';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-funding-details',
  templateUrl: './funding-details.component.html',
  styleUrls: ['./funding-details.component.css']
})
export class FundingDetailsComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute,
    public fundingService: FundingService,
    public brandService: BrandService) {
    route.params.subscribe(params => { this.id = params['funding']; });
  }

  ngOnInit() {
    this.fundingService.setCurrentFunding(parseInt(this.id));
    this.fundingService.getFundingCharities(parseInt(this.id));
    this.fundingService.getFundingDonations(parseInt(this.id));
    this.fundingService.getFundingStories(parseInt(this.id));
    this.fundingService.getFundingDonors(parseInt(this.id));
  }

}
