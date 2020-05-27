import { CONFIG_TOKEN, APP_CONFIG, AppConfig } from './config';
import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, InjectionToken, Inject} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CoursesService } from './services/courses/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
/*   providers: [
    // {
    //  provide: CONFIG_TOKEN,
    //  useFactory: () => APP_CONFIG
    //} 
    {
      provide: CONFIG_TOKEN,
      useValue: APP_CONFIG
    }
  ] */
})
export class AppComponent implements OnInit {


  courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService,
              @Inject(CONFIG_TOKEN) config: AppConfig ) {
    console.log('App config ', config);
  }

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }

  save(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('Course saved.')
    );
  }

}
