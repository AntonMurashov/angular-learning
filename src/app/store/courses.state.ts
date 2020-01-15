import { ICourse } from '../services/course.service';

export interface CoursesState {
    listCount: number,
    courses: ICourse[],
    maxId: number,
    currentCourse: ICourse;
}