import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./layout/Layout"
import { routesConfig } from "./routes/RoutesConfig"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Layout />}>
        {routesConfig.map((route, index) => (
          <Route
            key={index}
            index={route.path === ""}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  )
}

export default App
