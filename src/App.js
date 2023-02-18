import { Route, Link, Routes } from "react-router-dom"
import { KeepAliveProvider, withKeepAlive } from "keepalive-react-component"
import Home from "./components/Home"
import UserList from "./components/UserList"
import UserAdd from "./components/UserAdd"
let KeepAliveHome = withKeepAlive(Home, { cacheId: "Home" })
let KeepAliveUserList = withKeepAlive(UserList, {
  cacheId: "UserList",
  scroll: true,
})
let KeepAliveUserAdd = withKeepAlive(UserAdd, { cacheId: "UserAdd" })
const App = () => {
  return (
    <KeepAliveProvider>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/list">用户列表</Link>
        </li>
        <li>
          <Link to="/add">添加用户</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<KeepAliveHome />}></Route>
        <Route path="/list" element={<KeepAliveUserList />}></Route>
        <Route path="/add" element={<KeepAliveUserAdd />}></Route>
      </Routes>
    </KeepAliveProvider>
  )
}
export default App
