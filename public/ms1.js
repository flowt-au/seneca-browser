
Seneca()
    .use(math, { })
    .act('role:math,cmd:sum,left:1,right:23', console.log)
    .act('role:math,cmd:product,left:2,right:3', console.log)