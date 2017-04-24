function Clearing() {
    this.n = 0;
    this.deltaH = 0;
    this.time = 0;
    this.waterPolution = 0;

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

    this.getDeltaH = function () {
        return this.getTime() / this.getSegmentsNumber();
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
        let V = 1 - 110 / 70,
            D = 0.62;

        return V / D;
    };

    /**
     * @return {number}
     */
    this.Gl = function () {
        return 0.25 * (1 - Math.exp(-0.25 * this.getTime()));
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

        return Number(2 * this.h(n - 1) + this.h(n - 1) * (this.h(n - 1) + this.h(n)) * this.VStar() - this.h(n - 1) * this.h(n) * (this.h(n - 1) + this.h(n)) * this.Gl());
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

        return Number((2 * this.h(n - 1) + this.h(n - 1) * (this.h(n - 1) * this.h(n)) * this.VStar() + 2 * this.h(n)) / this.Kvgl());
    };

    this.clear = function () {
        let x = [];

        x[0] = Number(0 - this.h(1) * this.getWaterPolution());
        x[1] = 0;

        for (let n = 2; n < this.getSegmentsNumber(); n++) {
            this.setN(n);

            // console.log('K1l=',K1l(n));
            // console.log('K2l=',K2l(n));
            // console.log('n-1=',Number(n-1));
            // console.log('x=', Number(x[n-1]));
            // console.log('n-2',Number(n-2));
            // console.log('xn=',Number(x[n-2]));
            // console.log( K1l(n) * x[n-1] - K2l(n) * x[n-2]);
            x[n] = this.K1l() * x[n - 1] - this.K2l() * x[n - 2];
        }

        return x[this.getSegmentsNumber() - 1];
    }
}

let clearing = new Clearing();


$('button').click(
    function () {
        let time = $('#time').val(),
            radius = $('#radius').val(),
            segment = $('#segment').val();

        if (time.trim() !== '' && radius.trim() !== '' && segment.trim() !== '') {
            clearing.setSegmentsNumber(segment);
            clearing.setTime(time);
            clearing.setWaterPolution(73);
            console.log(clearing.clear());
        }
        else
        {
            alert('Enter all data');
        }
    }
);