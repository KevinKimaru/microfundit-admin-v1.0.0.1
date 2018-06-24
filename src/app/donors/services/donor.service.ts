import { Injectable } from '@angular/core';
import { Donor } from '../../models/donor.model';
import { HttpClient } from '@angular/common/http';
import { constants } from '../../constants';
import { Donation } from '../../models/donation.model';

@Injectable()
export class DonorService {

  currentDonor: Donor;
  currentDonorDonations: Donation[];
  donors: Donor[];
  constructor(private http: HttpClient) {

  }

  postDonor(donor: Donor) {
    return this.http.post(constants.base_uri + '/donors', donor);
  }

  putDonor(id, donor: Donor) {
    return this.http.put(constants.base_uri + '/donors/' + id, donor);
  }

  getDonors() {
    this.http.get(constants.base_uri + '/donors')
      .subscribe((data: any) => {
        this.donors = data._embedded.donors;
      });
  }

  deleteDonor(id: number) {
    return this.http.delete(constants.base_uri + 'users/' + id);
  }

  setCurrentDonor(donorId: number) {
    this.http.get(constants.base_uri + '/donors/' + donorId)
      .subscribe((data: any) => {
        this.currentDonor = data;
      }, (error: any) => {

      }, () => {
        this.http.get(constants.base_uri + '/donors/search/countDonorStories?donorId=' + donorId)
          .subscribe((data: any) => {
            this.currentDonor.storiesNumber = data;
          });
        this.http.get(constants.base_uri + '/donors/search/countDonorCharities?donorId=' + donorId)
          .subscribe((data: any) => {
            this.currentDonor.charitiesNumber = data;
          });
      });
  }

  getCurrentDonorDonations(donorId: number) {
    this.http.get(`${constants.base_uri}/donors/${donorId}/donations`)
      .subscribe((data: any) => {
        this.currentDonorDonations = data._embedded.donations;
      }, (error: any) => {

      }, () => {
        for (const donation of this.currentDonorDonations) {
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
          this.http.get(constants.base_uri + '/donations/' + donation.id + '/matchedBrands')
            .subscribe((data: any) => {
              donation.matchedBrands = data._embedded.brands;
            }, (error: any) => {

            }, () => {
              for (const brand of donation.matchedBrands) {
                brand.logoUrl = `${constants.base_uri}/brands/${brand.id}/logo/${brand.logoImage}`;
              }
            });
          this.http.get(constants.base_uri + '/donations/' + donation.id + '/story')
            .subscribe((data: any) => {
              donation.story = data;
            }, (error: any) => {

            }, () => {
              donation.story.logoUrl = `${constants.base_uri}/stories/${donation.story.id}/logo/${donation.story.logoImage}`;
              this.http.get(constants.base_uri + '/stories/' + donation.story.id + '/organisation')
                .subscribe((data: any) => {
                  donation.story.charity = data;
                }, (error: any)=> {

                }, ()=> {
                  donation.story.charity.logoUrl = `${constants.base_uri}/organisations/${donation.story.charity.id}/logo/${donation.story.charity.logoImage}`;
                });
            });
        }
      });
  }

}
