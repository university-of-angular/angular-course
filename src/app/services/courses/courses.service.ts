import { Course } from './../../model/course';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

let counter = 0;
@Injectable({
  providedIn: 'root',
  useFactory: (http) => new CoursesService(http),
  deps: [HttpClient]
})
export class CoursesService {

  id: number;

  constructor(private http: HttpClient) { 
    counter++;
    this.id = counter;
  }

  /**
   * To fetch all the courses.
   */
  loadCourses(): Observable<Course[]> {
    const params = new HttpParams()
    .set('page', '1')
    .set('pageSize', '10');

    return this.http.get<Course[]>('/api/courses', { params });
  }

  /**
   * To save a course.
   * @param course
   */
  saveCourse(course: Course) {
    // Adding a custom header
    const headers = new HttpHeaders()
                    .set('X-Auth', 'userId');

    return this.http.put(`/api/courses/${course.id}`, course, {headers});
  }
}
