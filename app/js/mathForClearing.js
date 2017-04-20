var time = 0,
    velocity = 5,
    h = 1,
    N = 10,
    V = 1,
    Gl = 2,
    x = [],
    waterPolution = 73;

var h = function(n){
    var deltaH = 1.2;
    return Math.sqrt(n * deltaH);
};

var Kvgl = function(n){
    return 2 * h(n-1) + h(n-1) * (h(n-1) + h(n)) * V - h(n-1) * h(n) * (h(n-1) + h(n)) * Gl;
};

var K2l = function(n){
    return 2 * h(n) / Kvgl(n);
};

var K1l = function(n) {
    return (2 * h(n-1) + h(n-1) * (h(n-1) * h(n)) * V + 2 * h(n)) / Kvgl(n);
}

x[0] = 0;
x[-1] = x[0] - h(1) * waterPolution;
// console.log(x[-1]);
    for ( var n=1; n < N; n++)
    {
      console.log('K1l=',K1l(n));
      console.log('K2l=',K2l(n));
      console.log('n-1=',n-1);
      console.log('x=', x[n-1]);
      console.log('n-2',n-2);
      console.log('xn=',x[n-2]);
      console.log( K1l(n) * x[n-1] - K2l(n) * x[n-2]);
         x[n] = K1l(n) * x[n-1] - K2l(n) * x[n-2];
      //x[n] = n;
    }
console.log(x);
