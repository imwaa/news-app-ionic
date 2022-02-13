import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces';

const apiKey = environment.apiKey
const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  private executeQuery<T>(endpoint:string){
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

  getTopHeadLinesByCategory(category: string):Observable<Article[]>{
    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}`).pipe(
      map(({articles}) => articles )
    )
  }

}
