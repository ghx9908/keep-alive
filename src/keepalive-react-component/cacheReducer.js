import * as cacheTypes from "./cache-types"
/**
 * @param {*} cacheStates 缓存状态
 * @param {*} action 改变状态的方法
 */
function cacheReducer(cacheStates = {}, { type, payload }) {
  const { cacheId } = payload
  switch (type) {
    case cacheTypes.CREATE:
      return {
        ...cacheStates,
        [cacheId]: {
          scrolls: {}, //滚动信息保存的对象，默认key是滚动的DOM 值是滚动的位置
          cacheId: payload.cacheId, //缓存ID
          element: payload.element, //要渲染的虚拟DOM
          status: cacheTypes.CREATE, //缓存的状态是创建
          doms: undefined, //此虚拟DOM对应的真实DOM
        },
      }
    //表示真实DOM已经创建成功
    case cacheTypes.CREATED:
      return {
        ...cacheStates,
        [cacheId]: {
          ...cacheStates[cacheId],
          doms: payload.doms, //真实DOM
          status: cacheTypes.CREATED, //缓存的状态是创建成功
        },
      }
    default:
      return cacheStates
  }
}
export default cacheReducer
