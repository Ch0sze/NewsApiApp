import { Component, OnDestroy } from '@angular/core';
import { NewsArticlesService } from '../../services/api/news-articles.service';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';
import { SettingsService } from '../../services/settings/settings.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnDestroy {
  selectedCategory = '';
  topHeadlines: any[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private articleService: NewsArticlesService,
    private router: Router,
    private modalCtrl: ModalController,
    private settingsService: SettingsService
  ) {
    // Subscribe to categoryChange$ observable to detect changes and refresh the articles
    this.settingsService.selectedCategory$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((selectedCategory: string) => {
        this.selectedCategory = selectedCategory;
        this.getTopHeadlines();
      });

    // Initial data load
    //this.getTopHeadlines();
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTopHeadlines() {
    console.log(this.selectedCategory);
    this.articleService.getTopHeadlines(this.selectedCategory).subscribe((results) => {
      this.topHeadlines = results.articles;
      console.log(this.topHeadlines);
    });
  }

  getDetails(selectedArticle: any) {
    const params: NavigationExtras = {
      queryParams: {
        'author': selectedArticle.author,
        'content': selectedArticle.content,
        'description': selectedArticle.description,
        'publishedAt': selectedArticle.publishedAt,
        'source': selectedArticle.source.name,
        'title': selectedArticle.title,
        'url': selectedArticle.url,
        'urlToImage': selectedArticle.urlToImage,
        'category': this.selectedCategory,
      },
    };
    this.router.navigate(['/details'], params);
  }

  async openSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });

    await modal.present();
  }
}
