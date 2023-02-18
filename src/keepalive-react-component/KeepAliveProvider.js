import { useReducer, useCallback } from "react"
import cacheReducer from "./cacheReducer"
import CacheContext from "./CacheContext"
import * as cacheTypes from "./cache-types"
function KeepAliveProvider(props) {
  //存放所有的缓存信息，dispatch派发动作的方法，可以通过派发动作修改缓存信息
  let [cacheStates, dispatch] = useReducer(cacheReducer, {})
  const mount = useCallback(
    ({ cacheId, element }) => {
      if (cacheStates[cacheId]) {
        let cacheState = cacheStates[cacheId]
        if (cacheState.status === cacheTypes.DESTROY) {
          let doms = cacheState.doms //获取到老的真实DOM
          doms.forEach((dom) => dom.parentNode.removeChild(dom)) //移除掉老的真实DOM
          dispatch({ type: cacheTypes.CREATE, payload: { cacheId, element } }) //重新派发
        }
      } else {
        dispatch({ type: cacheTypes.CREATE, payload: { cacheId, element } }) //创建成功
      }
    },
    [cacheStates]
  )
  let handleScroll = useCallback(
    (cacheId, event) => {
      if (cacheStates[cacheId]) {
        let scrolls = cacheStates[cacheId].scrolls
        scrolls[event.target] = event?.target?.scrollTop
      }
    },
    [cacheStates]
  )
  return (
    <CacheContext.Provider
      value={{ cacheStates, dispatch, mount, handleScroll }}
    >
      {props.children}
      {Object.values(cacheStates)
        .filter((cacheState) => cacheState.status !== cacheTypes.DESTROY)
        .map(({ cacheId, element }) => (
          <div
            id={`cache_${cacheId}`}
            key={cacheId}
            // 如果给原生dom组件添加了ref，那么当此真实DOD渲染到页面后会执行回调函数
            ref={(divDom) => {
              let cacheState = cacheStates[cacheId]
              if (
                divDom &&
                (!cacheState.doms || cacheState.status === cacheTypes.DESTROY)
              ) {
                let doms = Array.from(divDom.childNodes)
                dispatch({
                  type: cacheTypes.CREATED,
                  payload: { cacheId, doms: doms },
                })
              }
            }}
          >
            {element}
          </div> //divDOM儿子们就是这个element渲染出来的真实DOM
        ))}
    </CacheContext.Provider>
  )
}
export default KeepAliveProvider
