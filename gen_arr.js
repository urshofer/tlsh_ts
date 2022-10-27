"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byte_diff = exports.pairbit_diff = exports.generateTable = void 0;
function generateTable() {
    let result = [];
    for (let i = 0; i < 256; i++) {
        let temp = [];
        for (let j = 0; j < 256; j++) {
            let x = i, y = j, diff = 0;
            let d = Math.abs(x % 4 - y % 4);
            diff += (d == 3 ? 6 : d);
            x /= 4;
            y /= 4;
            d = Math.abs(x % 4 - y % 4);
            diff += (d == 3 ? 6 : d);
            x /= 4;
            y /= 4;
            d = Math.abs(x % 4 - y % 4);
            diff += (d == 3 ? 6 : d);
            x /= 4;
            y /= 4;
            d = Math.abs(x % 4 - y % 4);
            diff += (d == 3 ? 6 : d);
            temp.push(diff);
        }
        result.push(temp);
    }
    return result;
}
exports.generateTable = generateTable;
function pairbit_diff(pairb, opairb) {
    let diff = Math.abs(pairb - opairb);
    if (diff <= 1)
        return diff;
    else if (diff == 2)
        return 2;
    return 6;
}
exports.pairbit_diff = pairbit_diff;
function byte_diff(bv, obv) {
    let h1 = bv / 16;
    let oh1 = obv / 16;
    let h2 = bv % 16;
    let oh2 = obv % 16;
    let p1 = h1 / 4;
    let op1 = oh1 / 4;
    let p2 = h1 % 4;
    let op2 = oh1 % 4;
    let p3 = h2 / 4;
    let op3 = oh2 / 4;
    let p4 = h2 % 4;
    let op4 = oh2 % 4;
    let diff = 0;
    diff = diff + pairbit_diff(p1, op1);
    diff = diff + pairbit_diff(p2, op2);
    diff = diff + pairbit_diff(p3, op3);
    diff = diff + pairbit_diff(p4, op4);
    return diff;
}
exports.byte_diff = byte_diff;
//# sourceMappingURL=gen_arr.js.map