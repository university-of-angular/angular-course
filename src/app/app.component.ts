import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig, CONFIG_TOKEN } from './config';
import { Course } from './model/course';
import { CoursesService } from './services/courses/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService,
              @Inject(CONFIG_TOKEN) config: AppConfig ) {

  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }

  save(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('Course saved.')
    );
  }

  onEditCourse() {

  }

}
