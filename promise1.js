const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败

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
    try {
      
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onfulfilled, onRejected){
    if (this.state === FULFILLED) {
      onfulfilled(this.value)
    }
    if (this.state === REJECTED) {
      onfulfilled(this.reason)
    }
    if (this.state === PENDING) {
      console.log(99)
      this.onResolvedCallbacks.push(()=>{
        onfulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onfulfilled(this.reason)
      })
    }
  }
}

module.exports = MyPromise