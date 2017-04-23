function Clearing()
{
    this.n = 0;
    this.deltaH = 0;
    this.time = 0;

    this.setN = function(n) {
        this.n = n;
    };

    this.getN = function() {
        return this.n;
    };

    this.getDeltaH = function() {
        return this.getTime() / this.N;
    };

    this.setTime = function(t) {
        this.time =  t;
    };

    this.getTime = function() {
        return this.time;
    };

    /**
     * @return {number}
     */
    this.VStar = function() {
        let V = 1 - 110/70,
            D = 0.62;

        return V/D;
    };

    /**
     * @return {number}
     */
    this.Gl = function() {
        return 0.25 * (1 - Math.exp(-0.25 * t));
    };

    /**
     * @return {number}
     */
    this.h = function(n){
        return Number(Math.sqrt(n * this.getDeltaH()));
    };

    /**
     * @return {number}
     */
    this.Kvgl = function(){
        let n = this.getN();

        return Number(2 * this.h(n-1) + this.h(n-1) * (this.h(n-1) + this.h(n)) * this.VStar() - this.h(n-1) * this.h(n) * (this.h(n-1) + this.h(n)) * this.Gl());
    };

    /**
     * @return {number}
     */
    this.K2l = function(){
        let n = this.getN();

        return Number(2 * this.h(n) / this.Kvgl());
    };

    /**
     * @return {number}
     */
    this.K1l = function(){
        let n = this.getN();

        return Number((2 * this.h(n-1) + this.h(n-1) * (this.h(n-1) * this.h(n)) * this.VStar() + 2 * this.h(n)) / this.Kvgl());
    };

}

let clearing = new Clearing();


var time = 0,
    velocity = 5,
    N = 10,
    t = 10,
    deltaH = t / N,
    x = [],
    waterPolution = 73,
    waterAfterClearing = 0;



x[0] = Number(0 - h(1) * waterPolution);
x[1] = 0;

for ( let n=2; n < N; n++){
  // console.log('K1l=',K1l(n));
  // console.log('K2l=',K2l(n));
  // console.log('n-1=',Number(n-1));
  // console.log('x=', Number(x[n-1]));
  // console.log('n-2',Number(n-2));
  // console.log('xn=',Number(x[n-2]));
  // console.log( K1l(n) * x[n-1] - K2l(n) * x[n-2]);
     x[n] = K1l(n) * x[n-1] - K2l(n) * x[n-2];
}
console.log(x[N-1]);


