import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Funding } from '../../models/funding.model';
import { constants } from '../../constants';
import { Story } from '../../models/story.model';
import { Donation } from '../../models/donation.model';
import { Charity } from '../../models/charity.model';
import { Donor } from '../../models/donor.model';

@Injectable()
export class FundingService {

  fundings: Funding[];
  currentFunding: Funding;
  currentFundingStories: Story[];
  currentFundingDonations: Donation[];
  currentFundingCharities: Charity[];
  currentFundingDonors: Donor[];

  constructor(private http: HttpClient) { }

  postFunding(funding: Funding) {
    return this.http.post(constants.base_uri + '/fundings', funding);
  }

  putFunding(id, funding: Funding) {
    return this.http.put(constants.base_uri + '/fundings/' + id, funding);
  }

  getFundings() {
    this.http.get(constants.base_uri + '/fundings').subscribe((data: any) => {
      this.fundings = data._embedded.fundings;
    }, (error: any) => {

    }, () => {
      for (const funding of this.fundings) {
        this.getFundingDonationsNumber(this.currentFunding);
        this.getFundingDonorsNumber(this.currentFunding);
        this.getFundingStoriesNumber(this.currentFunding);
        this.getFundingCharitiesNumber(this.currentFunding);
        this.getMaxDonatedAmount(this.currentFunding);
        this.http.get(constants.base_uri + '/fundings/' + funding.id + '/brand').subscribe((data: any) => {
          funding.brand = data;
        });
      }
    });
  }

  deleteFunding(id: number) {
    return this.http.delete(constants.base_uri + '/fundings/' + id);
  }

  setCurrentFunding(id: number) {
    this.http.get(constants.base_uri + '/fundings/' + id).subscribe((data: any) => {
      this.currentFunding = data;
      this.getFundingDonationsNumber(this.currentFunding);
      this.getFundingDonorsNumber(this.currentFunding);
      this.getFundingStoriesNumber(this.currentFunding);
      this.getFundingCharitiesNumber(this.currentFunding);
      this.getMaxDonatedAmount(this.currentFunding);
    }, (error: any) => {

    }, () => {
      this.http.get(constants.base_uri + '/fundings/' + id + '/brand').subscribe((data: any) => {
        this.currentFunding.brand = data;
      })
    });
  }


  getFundingDonationsNumber(funding: Funding) {
    this.http.get(`${constants.base_uri}/fundings/search/countDonationsForFunding?fundingId=${funding.id}`)
      .subscribe((data: any) => {
        funding.donationsNumber = data;
      });
  }

  getFundingDonorsNumber(funding: Funding) {
    this.http.get(`${constants.base_uri}/fundings/search/countDonorsForFunding?fundingId=${funding.id}`)
      .subscribe((data: any) => {
        funding.donorsNumber = data;
      });
  }

  getFundingStoriesNumber(funding: Funding) {
    this.http.get(`${constants.base_uri}/fundings/search/countStoriesForFunding?fundingId=${funding.id}`)
      .subscribe((data: any) => {
        funding.storiesNumber = data;
      });
  }

  getFundingCharitiesNumber(funding: Funding) {
    this.http.get(`${constants.base_uri}/fundings/search/countOrganisationsForFunding?fundingId=${funding.id}`)
      .subscribe((data: any) => {
        funding.charitiesNumber = data;
      });
  }

  getMaxDonatedAmount(funding: Funding) {
    this.http.get(`${constants.base_uri}/fundings/search/maxDonationFunding?fundingId=${funding.id}`)
      .subscribe((data: any) => {
        funding.highestDonation = data;
      });
  }



  getFundingDonations(fundingId: number) {
    this.http.get(`${constants.base_uri}/fundings/search/findFundingDonations?fundingId=${fundingId}`)
      .subscribe((data: any) => {
        this.currentFundingDonations = data._embedded.donations;
      }, (error: any) => {

      }, () => {
        for (const donation of this.currentFundingDonations) {
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

  getFundingStories(fundingId: number) {
    this.http.get(constants.base_uri + '/fundings/search/findFundingStories?fundingId=' + fundingId)
      .subscribe((data: any) => {
        this.currentFundingStories = data._embedded.stories;
      }, (error: any) => {

      }, () => {
        for (const story of this.currentFundingStories) {
          this.http.get(constants.base_uri + '/stories/' + story.id + '/organisation')
            .subscribe((data: any) => {
              story.charity = data;
            });
          this.http.get(`${constants.base_uri}/fundings/search/countDonationsForStoryAndFunding?fundingId=${fundingId}&storyId=${story.id}`)
            .subscribe((data: any) => {
              story.currentFundingMatches = data;
            });
          this.http.get(`${constants.base_uri}/fundings/search/sumFundingAmountForStory?fundingId=${fundingId}&storyId=${story.id}`)
            .subscribe((data: any) => {
              story.currentFundingTotalAmount = data;
            })
          this.http.get(`${constants.base_uri}/fundings/search/countDonorsForStoryAndFunding?fundingId=${fundingId}&storyId=${story.id}`)
            .subscribe((data: any) => {
              story.currentFundingDonors = data;
            })
        }
      })
  }

  getFundingDonors(fundingId: number) {
    this.http.get(constants.base_uri + '/fundings/search/findFundingDonors?fundingId=' + fundingId)
      .subscribe((data: any) => {
        this.currentFundingDonors = data._embedded.donors;
      })
  }

  getFundingCharities(fundingId: number) {
    this.http.get(constants.base_uri + '/fundings/search/findFundingOrganisations?fundingId=' + fundingId)
      .subscribe((data: any) => {
        this.currentFundingCharities = data._embedded.organisations;
      })
  }

}
