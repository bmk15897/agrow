import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudantDataService {

  constructor(private http: HttpClient) { }

  db_url = 'http://192.168.1.36:5000/';

  getStatusCode() {
    return this.http.get(this.db_url);
  }

  signup(req) {
    return this.http.post(this.db_url + 'signup', req)
  }

  login(req) {
    return this.http.post(this.db_url + 'login', req);
  } 

  addMyCrop(req) {
    return this.http.post(this.db_url + 'addMyCropEntry', req);
  }


}
