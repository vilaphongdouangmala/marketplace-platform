import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken') || '';
    const header = new HttpHeaders();
    header.append('Accept', 'application/json');
    header.append('Content-Type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');
    if (token) {
      return header.append('Authorization', `Bearer ${token}`);
    }
    return header;
  }

  private handleError(error: any): Observable<never> {
    // Handle error here (e.g., logging, displaying error messages)
    return throwError(() => error);
  }

  post<T>(
    url: string,
    data: unknown,
    customHeader?: HttpHeaders
  ): Observable<T> {
    const headers = customHeader || this.getHeaders();
    return this.http
      .post<T>(url, data, { headers })
      .pipe(catchError((error) => this.handleError(error)));
  }

  postBlob(url: string, data: unknown): Observable<Blob> {
    const headers = this.getHeaders().set('Content-Type', '');
    return this.http
      .post(url, data, {
        headers,
        responseType: 'blob',
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(url, { headers: this.getHeaders(), params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  getBlob(url: string, params?: HttpParams): Observable<Blob> {
    return this.http
      .get(url, {
        headers: this.getHeaders(),
        params,
        responseType: 'blob',
      })
      .pipe(catchError((error) => this.handleError(error)));
  }

  update<T>(url: string, data: unknown): Observable<T> {
    return this.http
      .patch<T>(url, data, { headers: this.getHeaders() })
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(url, { headers: this.getHeaders() })
      .pipe(catchError((error) => this.handleError(error)));
  }

  checkRequest(error: HttpErrorResponse): void {
    if (
      error.status === 401 ||
      error.status === 403 ||
      error?.error?.message === 'Invalid Token'
    ) {
      //   localStorage.removeItem('accessToken');
      //   localStorage.removeItem('id');
      //   localStorage.removeItem('name');
      //   localStorage.removeItem('email');
      //   localStorage.removeItem('profileImage');
      this.router.navigate(['/login']);
    }
    try {
      this.handleError(error);
    } catch (e) {
      console.error(e);
    }
  }
}
