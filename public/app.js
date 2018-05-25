/* Seneca()
  .test('print')
  .client({ type: 'browser', pin: ['a:*', 'b:*', 'c:*'] })

  // ok
  .act('a:1,x:1', console.log)

  // unsafe
  .act('b:1,x:2', console.log)

  // error
  .act('c:1,x:3', console.log)
  */ 

Seneca()
//seneca
  .add(
    'role:math,cmd:sum',
    function (msg, respond) {
      var sum = msg.left + msg.right
      respond(null, { answer: sum })
    })

  // override role:math,cmd:sum with additional functionality
  .add(
    'role:math,cmd:sum',
    function (msg, respond) {

      // bail out early if there's a problem
      if (!Number.isFinite(msg.left) ||
        !Number.isFinite(msg.right)) {
        return respond(new Error("Expected left and right to be numbers."))
      }

      // call previous action function for role:math,cmd:sum
      this.prior({
        role: 'math',
        cmd: 'sum',
        left: msg.left,
        right: msg.right,

      }, function (err, result) {
        if (err) return respond(err)

        result.info = msg.left + '+' + msg.right
        respond(null, result)
      })
    })

  // enhanced role:math,cmd:sum
  .act('role:math,cmd:sum,left:1.5,right:1.7',
    console.log // prints { answer: 4, info: '1.5+2.5' }
  )