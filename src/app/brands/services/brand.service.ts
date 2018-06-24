import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Brand } from '../../models/brand.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { constants } from '../../constants';
import { Funding } from '../../models/funding.model';
import { Donation } from '../../models/donation.model';
import * as _ from 'lodash';
import { Story } from '../../models/story.model';
import { Donor } from '../../models/donor.model';
import { Charity } from '../../models/charity.model';

@Injectable()
export class BrandService {

  brands: Brand[];
  currentBrand: Brand;
  currentBrandFundings: Funding[];
  currentBrandActiveFundings: Funding[];
  currentBrandTotalAmountFunded: number;
  currentBrandMatchedAmountFunded: number;
  currentBrandDonations: Donation[];
  currentBrandStories: Story[];
  currentBrandDonors: Donor[];
  currentBrandCharities: Charity[];

  constructor(private http: HttpClient) { }

  getBrands() {
    this.http.get(constants.base_uri + '/brands').subscribe((data: any) => {
      this.brands = data._embedded.brands;
    }, (error: any)=> {

    }, ()=> {
      for (const brand of this.brands) {      
        brand.logoUrl = `${constants.base_uri}/brands/${brand.id}/logo/${brand.logoImage}`;
      }
    });
  }

  getCurrentBrand(id: number) {
    if (id)
      this.http.get(constants.base_uri + '/brands/' + id).subscribe((data: any) => {
        this.currentBrand = data;
      }, (error: any)=> {

      }, ()=> {
        this.currentBrand.logoUrl = `${constants.base_uri}/brands/${id}/logo/${this.currentBrand.logoImage}`;
      });
  }

  postBrand(brand: Brand) {
    return this.http.post(constants.base_uri + '/brands', brand);
  }

  putBrand(id, brand: Brand) {
    return this.http.put(constants.base_uri + '/brands/' + id, brand);
  }

  deleteBrand(id: number) {
    return this.http.delete(constants.base_uri + '/brands/' + id);
  }

  getBrandFundings(brandId: number) {
    this.http.get(constants.base_uri + '/brands/' + brandId + '/fundings')
      .subscribe((data: any) => {
        this.currentBrandFundings = data._embedded.fundings;
        this.currentBrandActiveFundings = this.currentBrandFundings
          .filter((funding: Funding) => funding.status == 1);
        this.currentBrandTotalAmountFunded = _.reduce(this.currentBrandFundings,
          (sum: number, funding: Funding) => {
            if (funding && funding.placedAmount) {
              sum = sum + funding.placedAmount;
            }
            return sum;
          }, 0);
        this.currentBrandMatchedAmountFunded = _.reduce(this.currentBrandFundings,
          (sum: number, funding: Funding) => {
            if (funding && funding.placedAmount && funding.currentAmount) {
              sum = sum + (funding.placedAmount - funding.currentAmount);
            }
            return sum;
          }, 0);
      }, (error: any) => {

      }, () => {
        for (const funding of this.currentBrandFundings) {
          this.http.get(`${constants.base_uri}/fundings/search/countDonationsForFunding?fundingId=${funding.id}`)
            .subscribe((data: any) => {
              funding.donationsNumber = data;
            });
        }
      })
  }

  getBrandDonations(brandId: number) {
    this.http.get(constants.base_uri + '/brands/' + brandId + '/donations')
      .subscribe((data: any) => {
        this.currentBrandDonations = data._embedded.donations;
      }, (error: any) => {

      }, () => {
        for (const donation of this.currentBrandDonations) {
          this.http.get(constants.base_uri + '/donations/' + donation.id + '/transactions')
            .subscribe((data: any) => {
              donation.transactions = data._embedded.transactions;
            }, (error: any) => {

            }, () => {
              donation.totalBrandAmount = 0;
              donation.totalStoryAmount = 0;
              donation.totalMicrofunditAmount = 0;
              for (const transaction of donation.transactions) {
                donation.totalBrandAmount += transaction.brandAmount;
                donation.totalStoryAmount += transaction.storyAmount;
                donation.totalMicrofunditAmount += transaction.microfunditAmount;
              }
            });
          this.http.get(constants.base_uri + '/donations/' + donation.id + '/donor')
            .subscribe((data: any) => {
              donation.donor = data;
            });
          this.http.get(constants.base_uri + '/donations/' + donation.id + '/story')
            .subscribe((data: any) => {
              donation.story = data;
            }, (error: any) => {

            }, () => {
              this.http.get(constants.base_uri + '/stories/' + donation.story.id + '/organisation')
                .subscribe((data: any) => {
                  donation.story.charity = data;
                });
            });
        }
      })
  }

  getBrandStories(brandId: number) {
    this.http.get(constants.base_uri + '/stories/search/findBrandStories?brandId=' + brandId)
      .subscribe((data: any) => {
        this.currentBrandStories = data._embedded.stories;
      }, (error: any) => {

      }, () => {
        for (const story of this.currentBrandStories) {
          story.logoUrl = `${constants.base_uri}/stories/${story.id}/logo/${story.logoImage}`;
          this.http.get(constants.base_uri + '/stories/' + story.id + '/organisation')
            .subscribe((data: any) => {
              story.charity = data;
            });
          this.http.get(`${constants.base_uri}/brands/search/countDonationsForStoryAndBrand?brandId=${brandId}&storyId=${story.id}`)
            .subscribe((data: any) => {
              story.currentBrandMatches = data;
            });
          this.http.get(`${constants.base_uri}/brands/search/sumBrandAmountForStory?brandId=${brandId}&storyId=${story.id}`)
            .subscribe((data: any) => {
            story.currentBrandTotalAmount = data;
            })
          this.http.get(`${constants.base_uri}/brands/search/countDonorsForStoryAndBrand?brandId=${brandId}&storyId=${story.id}`)
            .subscribe((data: any) => {
            story.currentBrandDonors = data;
            })
        }
      })
  }

  getBrandDonors(brandId: number) {
    this.http.get(constants.base_uri + '/donors/search/findBrandDonors?brandId=' + brandId)
      .subscribe((data: any) => {
        this.currentBrandDonors = data._embedded.donors;
      })
  }

  getBrandCharities(brandId: number) {
    this.http.get(constants.base_uri + '/organisations/search/findBrandOrganisations?brandId=' + brandId)
      .subscribe((data: any) => {
        this.currentBrandCharities = data._embedded.organisations;
      })
  }

  postLogo(file: File, brandId: number) {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', constants.base_uri + '/brands/' + brandId + '/uploadLogo', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
