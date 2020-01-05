import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoadingBlockService } from './loading-block.service';

class AUTHOR_MODEL {
  id: number;
  name: string;
  lastName: string;
}

export class Course implements ICourse {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: AUTHOR_MODEL[];
  isTopRated: boolean;
}

export interface ICourse {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: AUTHOR_MODEL[];
  isTopRated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient, private loadingBlockService: LoadingBlockService) { }

  public findAll(): Observable<ICourse[]> {
    return this.loadingBlockService.callWithLoadBlock(() =>
    this.http.get<ICourse[]>(`http://localhost:3004/courses`));
  }

  public getCourses(from: number = 0, count: number = 10, searchStr: string = null): Observable<ICourse[]> {
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.get<ICourse[]>(`http://localhost:3004/courses?start=${from}&count=${count}&sort=date&textFragment=${searchStr}`
      ));
  }

  public createCourse(course: ICourse): Observable<ICourse> {
    console.log('Creating course, ' + JSON.stringify(course));
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.post<ICourse>(`http://localhost:3004/courses`, course));
  }

  public deleteCourse(id: number): Observable<Object> {
    console.log('deleting ' + id);
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.delete(`http://localhost:3004/courses/${id}`));
  }

  public getCourse(id: number): Observable<ICourse> {
    console.log('getting ' + id);
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.get<ICourse>(`http://localhost:3004/courses/${id}`));
  }

  public updateCourse(id: number, course: ICourse): Observable<ICourse> {
    console.log('Updating course ' + id + ", " + JSON.stringify(course));
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.patch<ICourse>(`http://localhost:3004/courses/${id}`, course));
  }

  public getMaxId(): Observable<number> {
    return this.findAll().pipe(map(v => {
      return v.map(course => course.id).reduce((a, b) => Math.max(a, b));
    }));
  }
}
