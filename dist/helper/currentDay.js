"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function currentDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}
exports.default = currentDate;
