// 发布订阅 是发布和订阅之间没有任何联系
// 观察者模式 (内部是基于发布订阅的) 有一个观察者 被观察者

class Subject {
  constructor(name){
    this.name = name
    this.arr = []
    this.status = 'happy'
  }
  attach(observer){ // 注册观察者 基于发布订阅
    this.arr.push(observer)
  }
  setStatus(status){
    this.status = status
    this.arr.forEach(o => o.update(status))
  }
}

class Observer { // 观察者
  constructor(name){
    this.name = name
  }
  update(status){
    console.log(status)
  }
}

let s = new Subject('baby')
let m1 = new Observer('father')
let m2 = new Observer('mother')

// 注册关系 
s.attach(m1)
s.attach(m2)

// 状态改变通知观察者
s.setStatus('cry')