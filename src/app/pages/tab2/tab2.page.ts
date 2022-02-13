import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = ['business', 'entertainment', 'general','health', 'sciences','sports', 'technology']
  public selectedCategory: string = this.categories[0]
  public articles: Article[] = [];

  constructor(private newService:NewsService) {}

  ngOnInit(): void {
    this.newService.getTopHeadLinesByCategory(this.selectedCategory).subscribe(articles=>
      this.articles = [...articles])
  }

  segmentChanged(event: any){
    this.selectedCategory = event.detail.value
    this.newService.getTopHeadLinesByCategory(this.selectedCategory).subscribe(articles=>this.articles = [...articles])
  }

}
