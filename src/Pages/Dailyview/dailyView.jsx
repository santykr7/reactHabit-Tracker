import Style from "./dailyView.module.css"
import { useEffect, useState } from "react"

function DailyView() {
  const [habits, setHabits] = useState([])

  useEffect(() => {
    const data = localStorage.getItem("habitData")
    setHabits(JSON.parse(data) || [])
  }, [])

  /* ------------ Function to toggle habit status ------------ */
  const toggleStatus = (e, index) => {
    e.preventDefault()
    // Create a copy of the habits state
    const updatedHabits = [...habits]
    // Get the current habit
    const habit = updatedHabits[index]
    // Check if the habit and dates are defined
    if (habit && habit.dates && habit.dates.length > 0) {
      // Get the current date
      const lastDateIndex = habit.dates.length - 1
      const lastDate = habit.dates[lastDateIndex]

      // Update the status based on the current value
      if (lastDate.status === "0") {
        lastDate.status = "y"
      } else if (lastDate.status === "y") {
        lastDate.status = "n"
      } else if (lastDate.status === "n") {
        lastDate.status = "0"
      }
      // Update the habits state with the updated array
      setHabits(updatedHabits)
      // Update the habitData in local storage
      localStorage.setItem("habitData", JSON.stringify(updatedHabits))
    }
  }

  /* ------------ Function to convert into dd/mm format ------------ */
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" }
    const [month, day, year] = new Date(date)
      .toLocaleDateString(undefined, options)
      .split("/")
    return `${day}/${month}/${year}`
  }

  /* ------------ Function to delete habit ------------ */
  const deleteHabit = (e, habitIndex) => {
    e.preventDefault()
    // Create a copy of the habits state
    const updatedHabits = [...habits]
    // Remove the habit at the specified index
    updatedHabits.splice(habitIndex, 1)
    // Update the habits state with the updated array
    setHabits(updatedHabits)
    // Update the habitData in local storage
    localStorage.setItem("habitData", JSON.stringify(updatedHabits))
  }

  return (
    <div className={Style.container}>
      {habits.length === 0 ? (
        <div className={Style.no_hbt}>
          <p>No habit found.</p>
        </div>
      ) : (
        <div className={Style.habitList}>
          <h2>Daily View</h2>
          {habits.map((habit, habitIndex) => (
            <div key={habitIndex} className={Style.habitItem}>
              <p>{formatDate(habit.date)}</p>
              <h3>{habit.title}</h3>
              <div className={Style.habitMenu}>
                {habit.dates.length > 0 && (
                  <img
                    alt='status'
                    onClick={(e) => toggleStatus(e, habitIndex)}
                    src={
                      habit.dates[habit.dates.length - 1].status === "0"
                        ? "https://cdn-icons-png.flaticon.com/128/136/136889.png"
                        : habit.dates[habit.dates.length - 1].status === "n"
                        ? "https://cdn-icons-png.flaticon.com/128/5974/5974771.png"
                        : "https://cdn-icons-png.flaticon.com/128/4315/4315445.png"
                    }
                  />
                )}
                <img
                  alt='delete'
                  onClick={(e) => deleteHabit(e, habitIndex)}
                  src='https://cdn-icons-png.flaticon.com/128/565/565491.png'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DailyView
