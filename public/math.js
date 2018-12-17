//module.exports = function math(options) {
// For now, old school, just add this to window context.
function math(options) {

    /*
    Called via the S.use(math, {}); ie a wrapper for the messages in this math class / function

    Messages are defined as a string, not an object
    The function is what gets called when the pattern matches. 
    The pattern ends up as 'cmd:sum,role:math' ie alpha order on key names.

    ie pass the msg, callback is respond function ie err, data

    So, when this pattern matches, call the passed function which in turn calls its callback(respond)
    with (err, response data)

    Action:
    returns a Seneca instance
    Note: the message and the data is mixed togther in the string.
    What isnt recognised as message becomes the data

    var S1 = S.act('role:math,cmd:sum,left:1,right:23', console.log)
    or

    var myCallback = function(err, resp, meta){
        if (err) {
            console.log('myCallback err=', err);
        } else {
            console.log('myCallback result data=', resp);
        }
    }
    var S1 = S.act('role:math,cmd:sum,left:1,right:23', myCallback)

    */

    //this.add('role:math,cmd:sum', function sum(msg, respond) {
    //    console.log('math msg sum=',msg);
    //    respond(null, { answer: msg.left + msg.right })
    //})
                                    // ie can be anonymous function.
                                    // is just a callback function that has a callback function
                                    // which is the function you supply in the act() call
    this.add('role:math,cmd:sum', function(msg, callback) {
        console.log('math msg sum=', msg);
        callback(null, { answer: msg.left + msg.right })
    })

    this.add('role:math,cmd:product', function product(msg, respond) {
        console.log('math msg product=', msg);
        respond(null, { answer: msg.left * msg.right })
    })

    this.wrap('role:math', function (msg, respond) {
        console.log('math msg wrap=', msg);
        msg.left = Number(msg.left).valueOf()
        msg.right = Number(msg.right).valueOf()
        this.prior(msg, respond)
    })

}