import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, mergeMap, Observable, forkJoin } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.scss'],
})
export class TestChildComponent implements OnInit {
  @Input('id') articleId?: string;

  constructor(private http: HttpClient, private loader: LoaderService) {}

  // Assuming you have two API calls as observables: apiCall1$ and apiCall2$
  ngOnInit() {
    this.retrieveDefaultData();
    this.retrieveDefaultData2();
  }
  // post 2 finish then comments 2
  // comments 1 with post 1
  retrieveDefaultData(): void {
    this.getPost()
      .pipe(
        map((todo: any) => todo),
        mergeMap((todo: any) => this.getDetails(todo.id)),
        finalize(() => this.loader.hide())
      )
      .subscribe((response) => {
        this.mergeMapResult = response;
        console.log('mergeMapResult');
        console.log(this.mergeMapResult);
      });
  }
  mergeMapResult: any;

  getPost(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/2');
  }

  getDetails(id: any) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
  }

  retrieveDefaultData2(): void {
    const firstAPI = this.http.get(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    );
    const secondAPI = this.http.get(
      `https://jsonplaceholder.typicode.com/posts/1`
    );

    forkJoin([firstAPI, secondAPI]) //we can use more that 2 api request
      .pipe(
        finalize(() => {
          this.loader.hide();
          this.loader.hide();
        })
      )
      .subscribe((result) => {
        //this will return list of array of the result
        // this.firstApiResult = result[0];
        // this.secondApiResult = result[1];

        // console.log('firstAPI');
        this.ALL_APIS_done(result);
      });
  }

  ALL_APIS_done(result: [Object, Object]) {
    console.log('result');
    console.log(result);
  }
}
