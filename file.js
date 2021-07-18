let MyPromise = require('./promise')
let fs = require('fs')

function read(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, function(err, data){
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

read('name.txt', 'utf8').then((data) => {
  // console.log(data)
  return read('name.txt', 'utf8')
}).catch(()=>{
  return 100
})
let promise = new MyPromise((resolve, reject) => {
  resolve('888')
})
let promise2 = promise.then(data => {
  // return data
  // throw new Error('error')
  // return promise2
  return new MyPromise((resolve, reject) => {
    resolve('9999')
    // reject('777')
    // resolve(new MyPromise((resolve,reject) => {
    //   setTimeout(()=>{
    //     resolve('hello')
    //   }, 1000)
    // }))
    
  })
})
// promise2.then(data =>{
//   console.log(6,data)
// }, error => {
//   console.log(error)
// })

// .then(data =>{
//   console.log(2,data)
// }, err => {
//   return 100
// })
// .then(res => {
//   console.log(3, res)
//   throw new Error('44')
// }).catch((err) => {
//   console.log(4, err)
// })

let p = promise2.then(data =>{
  console.log(6,data)
  return new MyPromise((resolve, reject) => {
    resolve(data)
  })
}, error => {
  console.log(error)
})
p.then().then().then().then(res => {
  console.log(10, res)
})