import { CoursePart} from "../App";

interface CoursePartProps {
    part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePartProps) => { 
    switch (props.part.kind) {
        case "basic":
            return <em>{props.part.description}</em>;
        case "background":
            return (
                <div>
                    <em>{props.part.description}</em>
                    <div>submit to: {props.part.backgroundMaterial}</div>
                </div>
            )
        case "group":
            return <em>project exercises {props.part.groupProjectCount}</em>;
        case "special":
            return (
                <div>
                    <em>{props.part.description}</em>
                    <div>required skills: {props.part.requirements.join(", ")}</div>
                </div>
            )
        default:
            return assertNever(props.part);
    }
}


export default Part;