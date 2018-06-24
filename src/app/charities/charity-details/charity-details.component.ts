import { Component, OnInit } from '@angular/core';
import { CharityService } from '../services/charity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from '../../models/story.model';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css']
})
export class CharityDetailsComponent implements OnInit {

  id: string;

  constructor(public charityService: CharityService,
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService) {
    route.params.subscribe(params => { this.id = params['charity']; });
  }

  ngOnInit() {
    this.charityService.setCurrentCharity(parseInt(this.id));
    this.charityService.getCurrentCharityStories(parseInt(this.id));
  }

  navigate(story: Story) {
    this.storyService.currentStory = Object.assign({}, story);
    this.router.navigate([`charities/${this.charityService.currentCharity.id}/`, story.id]);
    return false;
  }

}
