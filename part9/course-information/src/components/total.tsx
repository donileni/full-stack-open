interface TotalProps {
    totalExcersies: number
}

const Total = (props: TotalProps) => {
    return <div>{props.totalExcersies}</div>
};

export default Total;