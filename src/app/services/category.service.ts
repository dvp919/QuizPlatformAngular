import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }
  //Load all the category

  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }


  //add category
  public addCategory(category: any){
    return this._http.post(`${baseUrl}/category/`,category);
  }
}
