interface TotalProps {
    totalExcersies: number
}

const Total = (props: TotalProps) => {
    return <p> Number of exercises {props.totalExcersies}</p>
};

export default Total;