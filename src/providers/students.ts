import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
 
@Injectable()
export class StudentService {

  
  headers: Headers;
  options: RequestOptions;
 
  constructor(private http: Http) {      
      this.headers = new Headers ({'content-type': 'application/json', 'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYjExZTRjOS1lYTkzLTQ4ZmItYTcwNi1mMGIxN2JhODk4ODUifQ.QMCussByOszd_fM_QY6La9_PV_XbvMrfs_zvf7p6pXs'});
      this.options = new RequestOptions ({headers: this.headers}); 
  }

  //ngOnInit() { this.getStudents(); }
 
  getStudents(drugURL): Observable<any> {
    return this.http.get(drugURL)
      .map(this.extractData)
      .catch(this.handleError); 
  }

  addStudent (drugURL, detail): Observable<any> {
    return this.http.post(drugURL, detail, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteStudent (drugURL): Observable<any> {
    return this.http.delete(drugURL, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateStudent (drugURL, detail): Observable<any> {
    return this.http.put(drugURL, detail, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData (res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() ||  '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }
   
}