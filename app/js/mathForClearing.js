function Clearing() {

    this.k1 = 1;
    this.k2 = 1;
    this.k3 = 1;
    this.n = 0;
    this.time = 0;
    this.waterPolution = 0;
    this.segmentsNumber = 10;

    this.setN = function (n) {
        this.n = n;
    };

    this.getN = function () {
        return this.n;
    };

    this.setSegmentsNumber = function (n) {
        this.segmentsNumber = n;
    };

    this.getSegmentsNumber = function () {
        return this.segmentsNumber;
    };

    this.getK1 = function () {
        return this.k1;
    };

    this.getK2 = function () {
        return this.k2;
    };

    this.getK3 = function () {
        return this.k3;
    };

    this.setK1 = function (k1) {
        this.k1 = k1;
    };

    this.setK2 = function (k2) {
        this.k2 = k2;
    };

    this.setK3 = function (k3) {
        this.k3 = k3;
    };

    this.getDeltaH = function () {
        return Number(this.getTime() / this.getSegmentsNumber());
    };

    this.setTime = function (t) {
        this.time = t;
    };

    this.getTime = function () {
        return this.time;
    };

    this.setWaterPolution = function (waterPolution) {
        this.waterPolution = waterPolution;
    };

    this.getWaterPolution = function () {
        return this.waterPolution;
    };

    /**
     * @return {number}
     */
    this.VStar = function () {
        let V = 1 - 110 / 50,
            D = 0.62;

        return V / D;
    };

    /**
     * @return {number}
     */
    this.Gl = function () {
        return - this.getK3() * ( 1 - Math.exp( - this.getK2() * ( 1 - Math.exp(-this.getK1() * this.getTime())) * this.getTime()));
    };

    /**
     * @return {number}
     */
    this.h = function (n) {
        return Number(Math.sqrt(n * this.getDeltaH()));
    };

    /**
     * @return {number}
     */
    this.Kvgl = function () {
        let n = this.getN();

        return Number(2 * this.h(n - 1) + this.h(n - 1) * (this.h(n - 1) + this.h(n)) * this.VStar()
            - this.h(n - 1) * this.h(n) * (this.h(n - 1) + this.h(n)) * this.Gl());
    };

    /**
     * @return {number}
     */
    this.K2l = function () {
        let n = this.getN();

        return Number(2 * this.h(n) / this.Kvgl());
    };

    /**
     * @return {number}
     */
    this.K1l = function () {
        let n = this.getN();

        return Number((2 * this.h(n - 1) + this.h(n - 1) * (this.h(n - 1) * this.h(n)) *
            this.VStar() + 2 * this.h(n)) / this.Kvgl());
    };

    this.prepareData = function () {
        let x = [];

        x[0] = Number(0 - this.h(1) * this.getWaterPolution());
        x[1] = 0;

        for (let n = 2; n < this.getSegmentsNumber(); n++) {
            this.setN(n);
            x[n] = this.K1l() * x[n - 1] - this.K2l() * x[n - 2];
        }

        return x[this.getSegmentsNumber() - 1];
    };

    this.clear = function () {
        let first, second;

        do {
            first = this.prepareData();
            this.setSegmentsNumber(this.getSegmentsNumber() * 2);
            second = this.prepareData();

        } while ( parseFloat(Math.abs(first - second)) > parseFloat(0.0001) );

        return second;
    }
}

module.exports = new Clearing();
