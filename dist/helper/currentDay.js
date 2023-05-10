"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function currentDate(time = false) {
    const today = new Date();
    if (time) {
        return today.getTime();
    }
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}
exports.default = currentDate;
