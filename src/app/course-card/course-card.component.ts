import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SkipSelf, Attribute, OnDestroy } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from './../services/courses/courses.service';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit, OnDestroy {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    constructor(private coursesService: CoursesService,
                @Attribute('type') private type: string) {

        console.log('constructor', this.course);
    }

    ngOnInit() {
        console.log('ngOnInit', this.course);
    }

    onSaveClicked(description: string) {

        this.courseEmitter.emit({...this.course, description: description});
    }

    onTitleChange(newTitle: string) {
        this.course.description = newTitle;
    }

    ngOnDestroy() {
        console.log('ngOnDestroy');
    }
}
