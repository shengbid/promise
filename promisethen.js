// promise then方法
const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) { // 不能返回自己,死循环,直接抛出错误
    return reject(new TypeError('类型错误'))
  }
  // 判断x的状态 判断x是不是promise
  // 1.判断是不是对象或者函数
  if (typeof x === 'object' && x !== null || typeof x === 'function'){
    // x需要是一个对象或者函数
    let called // 只能掉一个方法,失败或者成功,不能多吃调用成功或失败
    try {
      let then = x.then // 取出then方法 这个方法是采用defineProperty来定义的
      if (typeof then === 'function') { // 如果then不是一个函数,说明不是promise
        then.call(x, y => { // 将then作为this
          // resolve(y) // 如果是promise继续调用
          // console.log(99999)
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        },r=>{
          if (called) return
          called = true
          reject(r)
        })
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  }else {
    resolve(x)
  }

}
class MyPromise {
  constructor(executor){
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = [] // 存放成功时的回调
    this.onRejectedCallbacks = [] // 存放失败时的回调
    let resolve = (value) =>{
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try { // 只能捕获同步异常
      
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onfulfilled, onRejected){
    // 递归
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            
            let x = onfulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)

          }catch(e){
            reject(e)
          }
        }, 0)
      }
      if (this.state === PENDING) {
        // console.log(99)
        this.onResolvedCallbacks.push(()=>{
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
              
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        
      }

    })
    return promise2
  }
}

module.exports = MyPromise