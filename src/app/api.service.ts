import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json; charset=UTF-8" })
};
//const apiUrl = "/api/v1/users";
const apiUrl = "http://localhost:5555/users";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl)
      .pipe(
        tap(users => console.log('Fetch users', users)),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${apiUrl}/${id}`;
    console.log(this.http.get<User>(url))
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(user): Observable<User> {
    return this.http.post<User>(apiUrl, user, httpOptions).pipe(
      tap((user: User) => console.log(`added user w/ id=${user.id}`, user)),
      catchError(this.handleError<User>('addUsers'))
    );

  }

  updateUser(id, user) {
    const url = `${apiUrl}/${id}`;
    console.log(this.http.put(url, user, httpOptions))
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
    // fetch(url, {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     id: user.id,
    //     name: user.name,
    //     email: user.email,
    //     company: {
    //       name: user.company.mail
    //     }
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    // return 0
  }

  deleteUser(id): Observable<User> {
    const url = `${apiUrl}/${id}`;
    console.log(this.http.delete<User>(url, httpOptions))
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
