import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            switch (error.status) {
                case 0:
                    console.error('Network error — API unreachable');
                    break;
                case 422:
                    console.error('Validation error', error.error?.errors);
                    break;
                case 404:
                    console.error('Resource not found', error.url);
                    break;
                case 500:
                    console.error('Server error', error.message);
                    break;
                default:
                    console.error(`HTTP ${error.status}`, error.message);
            }

            return throwError(() => error);
        })
    );
};
