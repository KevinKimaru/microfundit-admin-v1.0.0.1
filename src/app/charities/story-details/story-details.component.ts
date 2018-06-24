import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../services/story.service';
import { CharityService } from '../services/charity.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-story-details',
  templateUrl: './story-details.component.html',
  styleUrls: ['./story-details.component.css']
})
export class StoryDetailsComponent implements OnInit {

  id: string;
  isLogo: boolean;

  constructor(private route: ActivatedRoute,
    public charityService: CharityService,
    public storyService: StoryService) {
    route.params.subscribe(params => { this.id = params['story']; });
  }

  ngOnInit() {
    this.storyService.setCurrentStory(parseInt(this.id));
    this.storyService.getCurrentStoryBrands(parseInt(this.id));
    this.storyService.getCurrentStoryDonations(parseInt(this.id));
    this.storyService.getCurrentStoryDonors(parseInt(this.id));
    this.storyService.getCurrentStoryImages(parseInt(this.id));
  }

  closeUpload() {
    this.isLogo = true;
  }

  addImage() {
    this.isLogo = false;
  }

}
