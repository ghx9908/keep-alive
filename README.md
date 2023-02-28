## 1.介绍

- 基于 react 开发出来的 react 缓存组件，类似于类似`vue`的`keepalive`包裹`vue-router`的效果功能

## 2. 基本用法

example

### 2.1 index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './components/Home';
import UserList from './components/UserList';
import UserAdd from './components/UserAdd';
import { KeepAliveProvider, withKeepAlive } from 'keepalive-react-component';
let KeepAliveHome = withKeepAlive(Home, { cacheId: 'Home'});
let KeepAliveUserList = withKeepAlive(UserList, { cacheId: 'UserList',scroll:true});
let KeepAliveUserAdd = withKeepAlive(UserAdd, { cacheId: 'UserAdd' });
const App = () => {
  return (
    <Router  >
      <KeepAliveProvider>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/list">用户列表</Link></li>
          <li><Link to="/add">添加用户</Link></li>
        </ul>
        <Switch>
          <Route path={'/'} component={KeepAliveHome} exact />
          <Route path={'/list'} component={KeepAliveUserList} />
          <Route path={'/add'} component={KeepAliveUserAdd} />
        </Switch>
      </KeepAliveProvider>
    </Router>
  )
}
ReactDOM.render(<App/>, document.getElementById('root'));
```

### 2.2 Home.js

example\components\Home.js

```
import React from 'react';
const Home = (props) => {
    return (
        <div>
            <button onClick={() => props.dispatch({ type: 'DESTROY', payload: { cacheId: 'UserAdd' } })}>重置UserAdd</button>
            <button onClick={() => props.dispatch({ type: 'DESTROY', payload: { cacheId: 'UserList' } })}>重置UserList</button>
        </div>
    )
}
export default Home;
```

### 2.3 UserAdd.js

example\components\UserAdd.js

```
import React from 'react';
const UserAdd = ()=>{
    let [number,setNumber]=React.useState(0);
    return (
        <div>
            用户名:<input/>
            <hr/>
            <button onClick={()=>setNumber(number=>number+1)}>{number}</button>
        </div>
    )
}
export default UserAdd;
```

### 2.4 UserList.js

example\components\UserList.js

```
import React from 'react';
import {Link} from 'react-router-dom'
const UserList = (props)=>{
    let users = new Array(100).fill(0);
    return (
        <ul style={{height:'200px',overflow:'scroll'}}>
            {
                users.map((item,index)=>(
                    <li key={index}><Link to={`/detail/${index}`}>{index}</Link></li>
                ))
            }
        </ul>
    )
}
export default UserList;
```
