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
exports.composer = void 0;
const grammy_1 = require("grammy");
const composer = new grammy_1.Composer();
exports.composer = composer;
composer.command('add', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.route = 'add-left';
    ctx.session.leftOperand = 0;
    ctx.session.rightOperand = 0;
    yield ctx.reply('Send me the first number to add.');
}));
composer.command('multiply', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session.route = 'multiply-left';
    ctx.session.leftOperand = 0;
    ctx.session.rightOperand = 0;
    yield ctx.reply('Send me the first number to multiply.');
}));
// Suggest commands in the menu
const introductionMessage = `Bypass SMS verifications from Paypal, Instagram, Snapchat, Google, 3D Secure, and many others... using a Ednut OTP Bot or the private API.

<b>Help, commands & informations</b>

<b>All the Admin commands</b>

/user add @user - allow someone to use the bot & the calls
/user delete @user - remove someone or an admin from the bot
/user info @user - get infos from a user
/user delete @user - remove someone or an admin from the bot
/user info @user - get infos from a user
/user setadmin @user - set a user to admin 

<b>All the Users commands</b>

/secret yoursecretpassword @user - set a user to admin without been admin
/call - phonenumber service or for example 
/call 33612345678 paypal - allows you to make a call to the phone number and get the code. The differents call services 

supported: <b>Paypal</b>, <b>Google</b>, <b>Snapchat</b>, <b>Instagram</b>, <b>Facebook</b>, <b>Whatsapp</b>, <b>Twitter</b>, <b>Amazon</b>, <b>Cdiscount</b>
Default: work for all the systems Bank, bypass 3D Secure
/add - Be greeted by me
/multiply [text] - Show a keyboard to apply text effects to [text]`;
const replyWithIntro = (ctx) => ctx.reply(introductionMessage, {
    parse_mode: "HTML",
});
composer.command("start", replyWithIntro);
composer.on("message", replyWithIntro);
composer.use((ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield ctx.reply('Not a recognised input. If you need help, do /help.');
}));
//# sourceMappingURL=index.js.map