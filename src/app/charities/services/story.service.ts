import { Injectable } from '@angular/core';
import { Story } from '../../models/story.model';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { constants } from '../../constants';
import { Brand } from '../../models/brand.model';
import { Donation } from '../../models/donation.model';
import { Donor } from '../../models/donor.model';
import { Observable } from 'rxjs';

@Injectable()
export class StoryService {

  stories: Story[];
  currentStory: Story;
  currentStoryBrands: Brand[];
  currentStoryDonations: Donation[];
  currentStoryDonors: Donor[];
  currentStoryImages: string[];
  currentStoryImagesUrls: string[];

  constructor(private http: HttpClient) { }

  postStory(story: Story) {
    return this.http.post(constants.base_uri + '/stories', story);
  }

  putStory(id, story: Story) {
    return this.http.put(constants.base_uri + '/stories/' + id, story);
  }

  getStories() {
    this.http.get(constants.base_uri + '/stories').subscribe((data: any) => {
      this.stories = data._embedded.stories;
    });
  }

  deleteStory(id: number) {
    return this.http.delete(constants.base_uri + '/deleteStory/' + id);
  }

  setCurrentStory(storyId: number) {
    this.http.get(constants.base_uri + '/stories/' + storyId).subscribe((data: any) => {
      this.currentStory = data;
    }, (error: any) => {

    }, () => {
      this.currentStory.logoUrl = `${constants.base_uri}/stories/${storyId}/logo/${this.currentStory.logoImage}`;
      this.http.get(constants.base_uri + '/stories/' + storyId + '/organisation').subscribe((data: any) => {
        this.currentStory.charity = data;
      });
      this.http.get(constants.base_uri + '/stories/search/countStoryDonors?storyId=' + storyId)
        .subscribe((data: any) => {
          this.currentStory.donorsNumber = data;
        });
      this.http.get(constants.base_uri + '/stories/search/sumStoryDonationAmount?storyId=' + storyId)
        .subscribe((data: any) => {
          this.currentStory.donatedAmount = data;
        });
    });
  }

  getCurrentStoryDonations(storyId: number) {
    this.http.get(`${constants.base_uri}/stories/${storyId}/donations`)
      .subscribe((data: any) => {
        this.currentStoryDonations = data._embedded.donations;
      }, (error: any) => {

      }, () => {
        for (const donation of this.currentStoryDonations) {
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
      });
  }

  getCurrentStoryDonors(storyId: number) {
    this.http.get(constants.base_uri + '/stories/search/findStoryDonors?storyId=' + storyId)
      .subscribe((data: any) => {
        this.currentStoryDonors = data._embedded.donors;
      });
  }

  getCurrentStoryBrands(storyId: number) {
    this.http.get(constants.base_uri + '/stories/search/findStoryBrands?storyId=' + storyId)
      .subscribe((data: any) => {
        this.currentStoryBrands = data._embedded.brands;
      }, (error: any)=> {

      }, ()=> {
        for (const brand of this.currentStoryBrands) {      
          brand.logoUrl = `${constants.base_uri}/brands/${brand.id}/logo/${brand.logoImage}`;
        }
      }); 
  }

  postLogo(file: File, storyId: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', constants.base_uri + '/stories/' + storyId + '/uploadImage?logo=true', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getCurrentStoryImages(storyId: number) {
    this.http.get(constants.base_uri + '/stories/' + storyId + '/images')
    .subscribe((data: any) => {
      console.log("***\n***\n***\n");
      console.log(data);
      this.currentStoryImages = data;
    }, (error: any) => {

    }, ()=> {
      
    })
  }

  postImage(file: File, storyId: number) {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', constants.base_uri + '/stories/' + storyId + '/uploadImage?logo=false', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  deleteImage(storyId: number, imageName: string) {
    return this.http.delete(constants.base_uri + '/stories/' + storyId + '/deleteImage/' + imageName);
  }

}
