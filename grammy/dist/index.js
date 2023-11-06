"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transformer_throttler_1 = require("@grammyjs/transformer-throttler");
const grammy_1 = require("grammy");
const composers_1 = require("./composers");
const add_1 = require("./routers/add");
const multiply_1 = require("./routers/multiply");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// 1. Create a bot with a token (get it from https://t.me/BotFather
const bot = new grammy_1.Bot('6442617557:AAHoHI8oGB9piDVsfEXixn0uggbF92kkeJE'); // <-- place your token inside this string
// 2. Attach an api throttler transformer to the bot
bot.api.config.use((0, transformer_throttler_1.apiThrottler)());
// 3. Attach a session middleware and specify the initial data
bot.use((0, grammy_1.session)({
    initial: () => ({
        route: '',
        leftOperand: 0,
        rightOperand: 0,
    }),
}));
// 4. Attach all routers to the bot as middleware
bot.use(add_1.router);
bot.use(multiply_1.router);
// 5. Attach all composers to the bot as middleware
bot.use(composers_1.composer);
// 6. Start the bot
bot.start();
//# sourceMappingURL=index.js.map