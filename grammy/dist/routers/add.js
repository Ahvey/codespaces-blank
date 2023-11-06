"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const router_1 = require("@grammyjs/router");
const router = new router_1.Router(ctx => ctx.session.route);
exports.router = router;
router.route('add-left', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const leftOperand = Number((_a = ctx.msg) === null || _a === void 0 ? void 0 : _a.text);
    if (isNaN(leftOperand)) {
        yield ctx.reply('Please provide a valid number.');
        return;
    }
    ctx.session.leftOperand = leftOperand;
    ctx.session.route = 'add-right';
    yield ctx.reply('Please provide the next number to add.');
}));
router.route('add-right', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const rightOperand = Number((_b = ctx.msg) === null || _b === void 0 ? void 0 : _b.text);
    if (isNaN(rightOperand)) {
        yield ctx.reply('Please provide a valid number.');
        return;
    }
    ctx.session.rightOperand = rightOperand;
    ctx.session.route = '';
    yield ctx.reply(`The result of adding the numbers is \
${ctx.session.leftOperand + ctx.session.rightOperand}`);
}));
//# sourceMappingURL=add.js.map