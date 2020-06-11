import { COURSES } from './../db-data';
import { Component, Inject, OnInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig, CONFIG_TOKEN } from './config';
import { Course } from './model/course';
import { CoursesService } from './services/courses/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {

  courses: Course[] = COURSES;

  loaded = false;

  constructor(private coursesService: CoursesService,
              @Inject(CONFIG_TOKEN) config: AppConfig,
              private cd: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  // This is the best method to implement some custom change detection logic
  ngDoCheck() {
    if (this.loaded) {
      this.cd.markForCheck();
      this.loaded = undefined;
    }
  }

  save(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('Course saved.')
    );
  }

  onEditCourse() {
    this.courses = [undefined];
  }

}
