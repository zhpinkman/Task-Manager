import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../classes/List';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


let lists : List[]
let getListAPI = 'http://localhost:3000/api/lists'
@Injectable({
  providedIn: 'root'
})
export class ListServiceService {
  constructor(private http: HttpClient) { }

  get_all_lists() : Observable<List[]> {
    return this.http.get<List[]>(getListAPI)
  }


}
