let fs = require('fs')

let MyPromise = require('./promise')

function read1() {
  return new MyPromise((resolve, reject) => {
    fs.readFile('name.txt', 'utf8', function(err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

function read() {
  let dfd = MyPromise.deferred()

  fs.readFile('name.txt', 'utf8', function(err, data) {
    if (err) {
      dfd.reject(err)
    }
    dfd.resolve(data)
  })
  return dfd.promise
}

// read1().then(data => {
//   console.log(1, data)
// })
// read1().catch(data => {
//   console.log('err', data)
// })
// read().then(data => {
//   console.log(data)
// })


let p = new MyPromise((resolve, reject) => {
  resolve('88')
})
// resolve方法
let p2 = new MyPromise((resolve, reject) => {
  resolve(new MyPromise((resolve, reject) => {
    resolve('888')
  }))
})

p.then(res => {
  console.log(res)
})
p2.then(res => {
  console.log(res)
})


