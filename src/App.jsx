/* ------------ IMPORT COMPONENTS ------------ */
Navbar
import Navbar from "./Components/Navbar/Navbar"
import DailyView from "./Pages/Dailyview/dailyView"

import Weekly from "./Pages/WeeklyView/weeklyView"
/* ------------ IMPORT ROUTER ------------ */
import { RouterProvider, createBrowserRouter } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "/", element: <DailyView /> },
        { path: "/weekly", element: <Weekly /> },
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
