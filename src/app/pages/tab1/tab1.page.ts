import { Component, OnInit } from '@angular/core';
import { Article, NewsResponse } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}
  
  ngOnInit(): void {
      this.newsService.getTopHeadLines()
      .subscribe(articles => this.articles.push(...articles))
  }
}
