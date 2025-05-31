/* Part1 of Content Component */
const Part1 = (props) => {
  return (
    <p>{props.partA.name} {props.partA.exercises}</p>
    /* Hey Part1 Component, you will receive a box called props.
    But only get the items labeled: partA.
    partA contains an object.
    Inside that object, get the name and exercises.
    After that, render those items as a paragraph.
    */
  )
}

/* Part2 of Content Component */
const Part2 = (props) => {
  return (
    <p>{props.partB.name} {props.partB.exercises}</p>
    /* Hey Part2 Component, you will receive a box called props.
    But only get the items labeled: partB.
    partB contains an object.
    Inside that object, get the name and exercises.
    After that, render those items as a paragraph.
    */
  )
}

/* Part3 of Content Component */
const Part3 = (props) => {
  return (
    <p>{props.partC.name} {props.partC.exercises}</p>
    /* Hey Part3 Component, you will receive a box called props.
    But only get the items labeled: partC.
    partC contains an object.
    Inside that object, get the name and exercises.
    After that, render those items as a paragraph.
    */
  )
}

/* Header Component */
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
    /* Hey Header Component, you will receive a box called props.
    But only get the item labeled course from that box.
    After getting that item, render it as a header.
    */
  )
}

/* Content Component */
const Content = (props) => {
  return (
    <div>
    <Part1 partA={props.course.parts[0]} />
    <Part2 partB={props.course.parts[1]} />
    <Part3 partC={props.course.parts[2]} />
    </div>
    /* Hey Content Component, you will receive a box called props.
    Only get the item labeled: course.
    That item is an object with 2 things in it - get the one named parts which is an array.
    After getting it, give it to Part1, 2, and 3 Components.
    Part1 component will receive index 0 of the array. Label it as partA. Note that index 0 is also an object.
    Part2 component will receive index 1 of the array. Label it as partB. Note that index 1 is also an object.
    Part3 component will receive index 2 of the array. Label it as partC. Note that index 2 is also an object.
    */
  )
}

/* Total Component */
const Total = (props) => {
  return (
    <p>
    Estimated work hours {props.course.parts[2].exercises}
    </p>
    /* Hey Total Component, you will receive a box called props.
    But only get the items labeled: exercises1, exercises2, and exercises3, from that box.
    After getting those items, add them, and render the sum together with the string in one paragraph.
    */
  )
}

/* This is the Main Component called "Calendar"*/
const Calendar = () => {
  const course = {
    name: 'July 2025',
    parts: [
      {
        name: 'Week',
        exercises: 27
      },
      {
        name: 'Tue',
        exercises: 1
      },
      {
        name: 'Partner A: Task A ',
        exercises: 4
      }
    ]
  }

  return (
      <div>
        <Header course={course} />
        {/* Hey Header Component, I'm giving you something called course!
        Here's what's in it: {course}.
        It's an object containing a string and an array.
        The array inside it has 3 objects inside.
        Each object has a pair of string and number.
        */}
        <Content course={course} />
        {/* Hey Content Component, I'm giving you something called course!
        Here's what's in it: {course}.
        It's an object containing a string and an array.
        The array inside it has 3 objects inside.
        Each object has a pair of string and number.
        */}
        <Total course={course} />
        {/* Hey Total Component, I'm giving you something called course!
        Here's what's in it: {course}.
        It's an object containing a string and an array.
        The array inside it has 3 objects inside.
        Each object has a pair of string and number.
        */}
      </div>
  )  
}

export default Calendar