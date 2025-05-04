import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANT } from '../shared/constant/api-constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {}

  getMembers(): Observable<any> {
    return this.http.get(API_CONSTANT.memberList);
  }
}
