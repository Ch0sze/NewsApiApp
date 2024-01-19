import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsArticlesService {

  constructor(private httpClient:HttpClient) {

  }

  getTopHeadlines(selectedCategory: string):Observable<any>{
    return this.httpClient.get(
      `${environment.url_base}top-headlines?country=us&category=${selectedCategory}&apiKey=${environment.api_key}`
    )
  }
  getArticlesByCategory(category: string):Observable<any>{
    return this.httpClient.get(
      `${environment.url_base}top-headlines?country=cz&category=${category}&apiKey=${environment.api_key}`
    )
  }
}
