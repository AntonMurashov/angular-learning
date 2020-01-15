import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingBlockService } from './loading-block.service';
import { BACKEND_PATH } from 'src/environments/environment';
import { Consts } from '../consts/consts';

interface IAuthorModel {
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
  authors: IAuthorModel[];
  isTopRated: boolean;
}

export interface ICourse {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: IAuthorModel[];
  isTopRated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient, private loadingBlockService: LoadingBlockService) { }

  public findAll(): Observable<ICourse[]> {
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.get<ICourse[]>(`${BACKEND_PATH}/courses`));
  }

  public getCourses(from: number = 0, count: number = Consts.COURSES_COUNT_INC, searchStr: string = null): Observable<ICourse[]> {
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.get<ICourse[]>(`${BACKEND_PATH}/courses?start=${from}&count=${count}&sort=date&textFragment=${searchStr}`));
  }

  public createCourse(course: ICourse): Observable<ICourse> {
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.post<ICourse>(`${BACKEND_PATH}/courses`, course));
  }

  public deleteCourse(id: number): Observable<ICourse> {
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.delete(`${BACKEND_PATH}/courses/${id}`));
  }

  public getCourse(id: number): Observable<ICourse> {
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.get<ICourse>(`${BACKEND_PATH}/courses/${id}`));
  }

  public updateCourse(id: number, course: ICourse): Observable<ICourse> {
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.patch<ICourse>(`${BACKEND_PATH}/courses/${id}`, course));
  }

  public getMaxId(): Observable<number> {
    return this.findAll().pipe(map(v => v.map(course => course.id).reduce((a, b) => Math.max(a, b))));
  }
}
