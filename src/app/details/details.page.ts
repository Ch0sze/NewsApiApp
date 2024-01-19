import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  author: any;
  content: any;
  description: any;
  publishedAt: any;
  url: any;
  title: any;
  image: any;
  source: any;
  heartColor: any;
  bookmarkColor: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private platform: Platform) {
  }

  ngOnInit() {
    this.author = this.activatedRoute.snapshot.queryParamMap.get('author');
    this.content = this.activatedRoute.snapshot.queryParamMap.get('content');
    this.description = this.activatedRoute.snapshot.queryParamMap.get('description');
    this.publishedAt = this.activatedRoute.snapshot.queryParamMap.get('publishedAt');
    this.source = this.activatedRoute.snapshot.queryParamMap.get('source');
    this.title = this.activatedRoute.snapshot.queryParamMap.get('title');
    this.image = this.activatedRoute.snapshot.queryParamMap.get('urlToImage');
    this.url = this.activatedRoute.snapshot.queryParamMap.get('url');
  }

  handleButtonClick(action: string) {
    this.ngOnInit();
    switch (action) {
      case 'heart':
        this.handleHeartButtonClick();
        break;
      case 'share':
        this.shareContent();
        break;
      case 'bookmark':
        this.handleBookmarkButtonClick();
        break;
      case 'readMore':
        // Handle Read More button click
        // Open the browser link, replace 'your-link' with the actual link
        this.platform.ready().then(() => {
          window.open(this.url, '_blank');
        });
        break;
      default:
        break;
    }

  }
  async shareContent() {
    this.ngOnInit();
    try {
      await navigator.share({
        title: this.title,
        text: this.content,
        url: this.url,
      });
    } catch (error) {
      console.error('Web Share API error:', error);
    }
  }
  handleHeartButtonClick() {
    this.heartColor = (this.heartColor === 'danger') ? 'primary' : 'danger';
  }
  handleBookmarkButtonClick() {
    this.bookmarkColor = (this.bookmarkColor === 'primary') ? 'danger' : 'primary';
  }

}
