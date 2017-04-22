var time = 0,
    velocity = 5,
    N = 10,
    V = 1 - 1.78/1.8,
    D = 0.0105,
    VStar = V/D,
    Gl = 2,
    x = [],
    waterPolution = 73,
    waterAfterClearing = 0;

function h(n){
    var deltaH = 1.2;
    return Number(Math.sqrt(n * deltaH));
}

function Kvgl(n){
    return Number(2 * h(n-1) + h(n-1) * (h(n-1) + h(n)) * VStar - h(n-1) * h(n) * (h(n-1) + h(n)) * Gl);
}

function K2l(n){
    return Number(2 * h(n) / Kvgl(n));
}

function K1l(n){
    return Number((2 * h(n-1) + h(n-1) * (h(n-1) * h(n)) * VStar + 2 * h(n)) / Kvgl(n));
}

x[0] = Number(0 - h(1) * waterPolution);
x[1] = 0;

for ( let n=2; n < N; n++){
  console.log('K1l=',K1l(n));
  console.log('K2l=',K2l(n));
  console.log('n-1=',Number(n-1));
  console.log('x=', Number(x[n-1]));
  console.log('n-2',Number(n-2));
  console.log('xn=',Number(x[n-2]));
  console.log( K1l(n) * x[n-1] - K2l(n) * x[n-2]);
     x[n] = K1l(n) * x[n-1] - K2l(n) * x[n-2];
}
console.log(x);
