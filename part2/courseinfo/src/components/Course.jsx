const Courses = ({ courses }) => {
    return (
        <>
            <h1>Web development curriculum</h1>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => { return <h2>{course}</h2> }

const Total = ({ parts }) => {
    return <p><b>total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</b></p>
}

const Part = ({ part }) => {
    return <p>
        {part.name} {part.exercises}
    </p>
}

const Content = ({ parts }) => {
    return <>
        {parts.map(part => <Part key={part.id} part={part} />)}
    </>
}

export default Courses