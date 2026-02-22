import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        let message = 'Something went wrong';

        if (error.error?.message) {
          message = error.error.message;
        } else if (error.status === 401) {
          message = 'Unauthorized';
        } else if (error.status === 403) {
          message = 'Forbidden';
        } else if (error.status === 404) {
          message = 'Resource not found';
        }

        return throwError(() => new Error(message));
      })
    );
  }
}