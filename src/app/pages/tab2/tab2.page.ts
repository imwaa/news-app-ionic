import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public categories: string[] = ['business', 'entertainment', 'general','health', 'sciences','sports', 'technology']
  public selectedCategory: string = this.categories[0]
  constructor() {}

  segmentChanged(category: string){
    console.log(category)
  }

}
