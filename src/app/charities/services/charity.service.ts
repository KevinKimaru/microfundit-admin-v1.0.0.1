import { Injectable } from '@angular/core';
import { Charity } from '../../models/charity.model';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { constants } from '../../constants';
import { Story } from '../../models/story.model';
import { Observable } from 'rxjs';

@Injectable()
export class CharityService {

  charities: Charity[];
  currentCharity: Charity;
  currentCharityStories: Story[];

  constructor(private http: HttpClient) { }

  postCharity(charity: Charity) {
    return this.http.post(constants.base_uri + '/organisations', charity);
  }

  putCharity(id, charity: Charity) {
    return this.http.put(constants.base_uri + '/organisations/' + id, charity);
  }

  getCharities() {
    this.http.get(constants.base_uri + '/organisations')
      .subscribe((data: any) => {
        this.charities = data._embedded.organisations;
      }, (error: any) => {

      }, () => {
        for (const charity of this.charities) {
          charity.logoUrl = `${constants.base_uri}/organisations/${charity.id}/logo/${charity.logoImage}`;
        }
      });
  }

  deleteCharity(id: number) {
    return this.http.delete(constants.base_uri + '/organisations/' + id);
  }

  setCurrentCharity(charityId: number) {
    this.http.get(constants.base_uri + '/organisations/' + charityId)
      .subscribe((data: any) => {
        this.currentCharity = data;
      }, (error: any) => {

      }, () => {
        this.currentCharity.logoUrl = `${constants.base_uri}/organisations/${charityId}/logo/${this.currentCharity.logoImage}`;
      });
  }

  getCurrentCharityStories(charityId: number) {
    this.http.get(constants.base_uri + '/organisations/' + charityId + '/stories')
      .subscribe((data: any) => {
        this.currentCharityStories = data._embedded.stories;
      }, (error: any) => {

      }, () => {
        for (const story of this.currentCharityStories) {
          story.logoUrl = `${constants.base_uri}/stories/${story.id}/logo/${story.logoImage}`;
        }
      });
  }

  postLogo(file: File, charityId: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', constants.base_uri + '/organisations/' + charityId + '/uploadLogo', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

}
