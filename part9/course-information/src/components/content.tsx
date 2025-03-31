import Part from "./part";
import { CoursePart } from "../App";

interface CoursesProps {
    courses: CoursePart[]
}

const Content = (props: CoursesProps) => {
    return (
        <div>
            {props.courses.map(course => (
                <div key={course.name}>
                    <h3 style={{ marginBottom: "0px" }}>{course.name} {course.exerciseCount}</h3>
                    <Part part={course}/>
                </div>
            ))}
        </div>
    )
}; 

export default Content;