interface Course {
    name: string,
    exerciseCount: number
};

interface CoursesProps {
    courses: Course[]
}

const Content = (props: CoursesProps) => {
    return (
        <div>
            {props.courses.map(course => (
                <p key={course.name}>{course.name} {course.exerciseCount}</p>
            ))}
        </div>
    )
}; 

export default Content;