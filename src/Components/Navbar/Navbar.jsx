import Style from "./navbar.module.css"
import { useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"

// Function to display the Navbar
function Navbar() {
  const [title, setTitle] = useState("")
  const [habits, setHabits] = useState([])

  useEffect(() => {
    const data = localStorage.getItem("habitData")
    const parsedData = JSON.parse(data)
    const habitData = Array.isArray(parsedData) ? parsedData : []
    setHabits(habitData)
  }, [])
  /* ------------ Function to add new habit ------------ */
  const handleSubmit = (e) => {
    let months = [
      "",
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ]
    let dates = []
    for (let i = 6; i >= 0; i--) {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() - i)
      let mm = currentDate.getMonth() + 1
      mm = months[mm]
      let dd = currentDate.getDate()
      if (dd < 10) dd = "0" + dd

      const d = {
        date: dd + " " + mm,
        status: "0",
      }
      dates.push(d)
    }

    const newHabit = {
      title: title,
      date: Date.now(),
      dates: dates,
    }
    const updatedHabits = [...habits, newHabit]
    setHabits(updatedHabits)
    localStorage.setItem("habitData", JSON.stringify(updatedHabits))
    setTitle("")
  }

  return (
    <div className={Style.container}>
      <div className={Style.aside}>
        <div className={Style.title}>
          <h1> </h1>
          <p>Add and track habits and make yourself productive.</p>
        </div>
        <div className={Style.addHabit}>
          <form onSubmit={handleSubmit} className={Style.addForm}>
            <input
              type='text'
              placeholder='Enter Habit'
              value={title}
              required
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
            <button type='submit' className={Style.add_btn}>
              Add Habit
            </button>
          </form>
        </div>
      </div>

      <div className={Style.main}>
        <div className={Style.navbar}>
          <NavLink
            to='/'
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#362b40",
                    backgroundColor: "#dce1f7",
                    boxShadow: "rgba(0, 0, 0, .3) 5px 8px 8px -5px",
                  }
                : {}
            }
          >
            Daily{" "}
          </NavLink>
          <NavLink
            to='/weekly'
            style={({ isActive }) =>
              isActive
                ? {
                    color: "#362b40",
                    backgroundColor: "#dce1f7",
                    boxShadow: "rgba(0, 0, 0, .3) 5px 8px 8px -5px",
                  }
                : {}
            }
          >
            Weekly{" "}
          </NavLink>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default Navbar
