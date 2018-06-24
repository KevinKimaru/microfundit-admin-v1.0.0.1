import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../services/brand.service';
import { Funding } from '../../models/funding.model';
import { FundingService } from '../services/funding.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute,
    public brandService: BrandService,
    private router: Router,
    public fundingService: FundingService) {
    route.params.subscribe(params => { this.id = params['brand']; });
  }

  ngOnInit() {
    this.brandService.getCurrentBrand(parseInt(this.id));
    this.brandService.getBrandFundings(parseInt(this.id));
    this.brandService.getBrandDonations(parseInt(this.id));
    this.brandService.getBrandCharities(parseInt(this.id));
    this.brandService.getBrandDonors(parseInt(this.id));
    this.brandService.getBrandStories(parseInt(this.id));
  }

  navigate(funding: Funding) {
    this.fundingService.currentFunding = Object.assign({}, funding);
    this.router.navigate([`brands/${this.brandService.currentBrand.id}/`, funding.id]);
    return false;
  }

}
