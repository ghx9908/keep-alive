import { useContext, useRef, useEffect } from "react"
import CacheContext from "./CacheContext"
function withKeepAlive(OldComponent, { cacheId = window.location.pathname }) {
  return function (props) {
    const { mount, cacheStates } = useContext(CacheContext)
    const ref = useRef(null)
    useEffect(() => {
      let cacheState = cacheStates[cacheId]
      //真实DOM已经存在了
      if (cacheState && cacheState.doms) {
        let doms = cacheState.doms
        doms.forEach((dom) => ref.current.appendChild(dom))
      } else {
        mount({
          cacheId,
          element: <OldComponent {...props} />,
        })
      }
    }, [cacheStates, mount, props])
    return <div ref={ref} id={`keepalive_${cacheId}`} />
  }
}
export default withKeepAlive
/**
 * 组件的核心思想是
 * 通过缓存容器去创建OldComponent对应的真实dom，进行缓存
 * 即使这个OldComponent被销毁了，缓存还可以继续保留
 * 后面OldComponent再次进行渲染的时候，可以复用上次的缓存就可以了
 */
