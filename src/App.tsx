import { keycloak } from "./main"

function App() {
  return (
    <>
      React Keycloak

      <button onClick={() => keycloak?.logout()}>Logout</button>
    </>
  )
}

export default App
