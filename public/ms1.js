
 //Seneca()
 //   .use(math, { })
 //   .act('role:math,cmd:sum,left:1,right:23', console.log)
 //   .act('role:math,cmd:product,left:2,right:3', console.log)
    
    var S = Seneca();
    var S1 = S.use(math, { });

    var myCallback = function(err, resp, meta){
        console.log('myCallback=',arguments)
        if (err) {
            console.log('myCallback err=', err);
        } else {
            console.log('myCallback result data=', resp);
        }
    }
    //var S2 = S1.act('role:math,cmd:sum,left:1,right:23', console.log)
    var S2 = S1.act('role:math,cmd:sum,left:1,right:23', myCallback)
    var S3 = S2.act('role:math,cmd:product,left:2,right:3', console.log)
    
    // is Async so this fires before any of the above.
    // All return a Seneca instance
    //console.log('S3=',S3);