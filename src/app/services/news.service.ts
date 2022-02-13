import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article, articlesByCategoryAndPage, NewsResponse } from '../interfaces';

const apiKey = environment.apiKey
const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategoryAndPage:articlesByCategoryAndPage = {}

  constructor(private http: HttpClient) { }

  private executeQuery<T>(endpoint:string){
    console.log("Requete http realise")
    return this.http.get<T>(`${apiUrl}${endpoint}`,{
      params:{
        apiKey: apiKey,
        country:'be'
      }
    })
  }

  getTopHeadLines():Observable<Article[]>{
    return this.executeQuery<NewsResponse>(`/top-headlines`).pipe(
      map(({articles}) => articles )
    )
  }

  getTopHeadLinesByCategory(category: string, loadMore: boolean = false):Observable<Article[]>{

    if(loadMore){
      return this.getArticlesByCategory(category)
    }

    if(this.articlesByCategoryAndPage[category]){
      return of(this.articlesByCategoryAndPage[category].articles)
    }
    
    return this.getArticlesByCategory(category)
  }

  private getArticlesByCategory(category:string):Observable<Article[]>{
    if(Object.keys(this.articlesByCategoryAndPage).includes(category)){
    }
    else{
      this.articlesByCategoryAndPage[category] = {
        page:0,
        articles:[]
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`).pipe(
      map(({articles}) => {
        if(articles.length === 0){
          return this.articlesByCategoryAndPage[category].articles
        }
        
        this.articlesByCategoryAndPage[category] = {
          page:page,
          articles: [...this.articlesByCategoryAndPage[category].articles, ...articles]
        }

        return this.articlesByCategoryAndPage[category].articles
      } )
    )
  }
}
