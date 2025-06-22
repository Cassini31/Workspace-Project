import React, { useState } from 'react'

const CalendarTable = () => {
  const Today = new Date() /* Creates new date object representing the current date and time. */
  const CurrentDayIndex = Today.getDay() /* Method to return the day of the week as Index where Sunday = 0, Monday = 1, Tuesday = 2 etc. */
  const DayFormat = {weekday: 'short'} /* Object to specify format */
  const [Owners, SetOwners] = useState([]) /* ?? */
  const [NewOwners, SetNewOwners] = useState([]) /* ?? */
  const [Tasks, SetTasks] = useState([]) /* ?? */
  
  const GetWeekDays = () => {
    const WeekDays = [] /* Creates an array. */

    for (let i = 0; i < 7; i++) {
      const Day = new Date(Today) /* Safe copy of "Today" variable for mutation later i.e. June 9, 2025 (down to the local time). */
      Day.setDate(Today.getDate() - CurrentDayIndex + i) /* Mutate "Day" to change its day of the month according to local time i.e. 9 (from June 9) - 1 (Monday) + 0 (Current value of i) = 8. */

      const DayName = Day.toLocaleDateString(undefined,DayFormat) /* Returns the day of the week from the mutated "Day" variable in short day format i.e. Sun. */
      const DateNum = Day.getDate() /* Returns the day of the month from the mutated "Day" variable according to local time i.e. 8. */

      WeekDays.push(`${DayName} ${DateNum}`) /* To update the "WeekDays" array with "DayName" and "DateNum". */
      /* After running the above block of code, the afterthought of the For Loop will increment i with 1, then it will evaluate again the conditional expression of i < 7 using the iterated value of i. */
      /* For as long as the conditional expression of the For Loop returns a true evaluation, the above block of code will continue to run. */
      /* When i reaches a value that is = or > 7 (the conditional expression of the For Loop), it will return a false evaluation and the above block of code will stop running. */
    }
    return (
      WeekDays
    )
    /* Returns the mutated "WeekDays" array after the above For Loop. */
  }

  const WeekHeaders = GetWeekDays() /* ?? */

  const HandleAddOwners = () => {
    const Trimmed = NewOwners.trim() /* ?? */
    if (!Trimmed || Owners.includes(Trimmed)) return /* ?? */
    SetOwners ([...Owners, Trimmed]) /* ?? */
    SetTasks({...Tasks, [Trimmed]: Array.from({ length: 7 }, () => [])}) /* ?? */
    SetNewOwners('') /* ?? */
  }

  const AddTask = ({ onAdd }) => { /* ?? */
    const [Task, SetTask] = useState('') /* ?? */
    const [Hours, SetHours] = useState('') /* ?? */

    const HandleAddClick = () => { /* ?? */
      const NumericHours = parseFloat(Hours) /* ?? */
      if (Task && !isNaN(NumericHours)) { /* ?? */
        onAdd({ name: Task, duration: `${NumericHours} hrs` }) /* ?? */
        SetTask('') /* ?? */
        SetHours('') /* ?? */
      }
    }

    return ( /* ?? */
      <div style={{ marginTop: '10px' }}> {/* ?? */}
        <input
          type="text" /* ?? */
          placeholder="Task name" /* ?? */
          value={Task} /* ?? */
          onChange={(e) => SetTask(e.target.value)} /* ?? */
        />
        <input
          type="number" /* ?? */
          placeholder="Hours" /* ?? */
          value={Hours} /* ?? */
          onChange={(e) => SetHours(e.target.value)} /* ?? */
          style={{ marginLeft: '8px', width: '60px' }} /* ?? */
        />
        <button onClick={HandleAddClick} style={{ marginLeft: '8px' }}> {/* ?? */}
          +
        </button>
      </div>
    )
}

  return (
    <div>
      <table border="1" cellSpacing="0" cellPadding="30">{/* ?? */}
        <thead>
          <tr>
            <th>Partners</th>
            {WeekHeaders.map((label, index) => ( /* ?? */
              <th key={index}>{label}</th>/* ?? */
            ))}
          </tr>
        </thead>
        <tbody>
          {Owners.map((Owners, OwnersIndex) => ( /* ?? */
            <tr key={OwnersIndex}>{/* ?? */}
              <td>{Owners}</td>{/* ?? */}
              {Array(7) /* ?? */
                .fill(0) /* ?? */
                .map((_,DayIndex) => { /* ?? */
                  const DayTasks = Tasks[Owners]?.[DayIndex] || [] /* ?? */

                  return (
                    <td key={DayIndex}>{/* ?? */}
                      <AddTask 
                        onAdd={(NewTasks) => { /* ?? */
                          SetTasks(prev => ({ /* ?? */
                            ...prev, /* ?? */
                            [Owners]: prev[Owners].map((DayTasks, i) => /* ?? */
                              i === DayIndex /* ?? */
                                ? [...DayTasks, NewTasks] /* ?? */
                                : DayTasks /* ?? */
                            )
                          }))
                        }}
                      />
                      
                      <ul>
                        {DayTasks.map((Tasks, i) => ( /* ?? */
                          <li key={i}>{/* ?? */}
                            {Tasks.name} {Tasks.duration}{/* ?? */}
                          </li>
                        ))}
                      </ul>
                      
                    </td>
                  )
                })}
            </tr>
          ))}
        </tbody>
      </table>
      <input
       type="text"
       placeholder="Add Partner"
       value={NewOwners}
       onChange={(e) => SetNewOwners(e.target.value)} 
       style={{ marginLeft: '50px', width: '200px' }}
       /* ?? */
      />
      <button onClick={HandleAddOwners} style={{ marginLeft: '8px' }}>+</button>
    </div>
    /* ?? */
  )
}

export default CalendarTable