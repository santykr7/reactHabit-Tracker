/* ------------ IMPORT COMPONENTS ------------ */
import Navbar from "./Components/Navbar/Navbar"
import DailyView from "./Pages/Dailyview/dailyView"
import WeeklyView from "./Pages/WeeklyView/WeeklyView"

/* ------------ IMPORT ROUTER ------------ */
import { RouterProvider, createBrowserRouter } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <DailyView /> },
        { path: "/weekly", element: <WeeklyView /> },
      ],
    },
  ])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
