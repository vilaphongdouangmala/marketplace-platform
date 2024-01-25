import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndpoints } from '../app/constants/api.constant';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    return this.apiService.post(apiEndpoints.login, {
      username,
      password,
    });
  }
}
