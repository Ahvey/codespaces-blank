const config = require('./config');
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
let phonenumber;
let templates = [];
let count = 0;
let settings ={};
settings.host = config.smsHost
let regexp = /((\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?)/gim;
let regexpKeyboard = /\/buttons/gim;
let formApi_id;

const sendTemplate = function(template, id){

     formApi_id ={
        api_id: settings.api_id,
        to: phonenumber,
        msg: template,
        json:1//,
         //test:1
    };
    let postQuery = `https://${settings.host}`

    const requestSms = (id)=>{
        request.post(postQuery, {
            form: formApi_id
        }, function (err, httpResponse, body) {
            if (err) {
                console.error('Error !!!!!!:', err);
                return;
            }
            let res = JSON.parse(body);
            let responce;
            console.log('res', res)
            if (res.sms) {
                for (let phoneinsms in res.sms) {
                    responce = (res.sms[phoneinsms].status_code == 100) ? 'Message to number ' + phoneinsms + ' successfully sent. Your balance: ' + res.balance :
                        'ERROR: ' + res.sms[phoneinsms].status_text + '. Your balance: ' + res.balance
                }
            }
            else {
                responce = res.status +':' +res.status_text
            }
            bot.sendMessage(id, responce);
            phonenumber = null;
            formApi_id.to = null;
        })
    }
    const checkPhoneNumber = (id, msg)=> {
        if (msg.match(regexp)) {
            console.log('msg', msg);
            formApi_id.to = msg.replace(/[\D]/g, '');
            formApi_id.to = (formApi_id.to.length == 10) ? '+7' + msg : '+7' + msg.slice(1)
            requestSms(id);


        }
        else {
            bot.sendMessage(id, 'It was not possible to determine the phone number in this message, enter the phone number in the format 89663760909', {
                reply_markup: {
                    force_reply: true
                }
            }).then(gotTelephone => {
                bot.onReplyToMessage(gotTelephone.chat.id, gotTelephone.message_id, txt => {
                   return checkPhoneNumber( gotTelephone.chat.id, txt.text)
                })
            })
        }
    }
if (!formApi_id.to) {
    phonenumber = true;
    bot.sendMessage(id, `Enter a phone number to send a message`, {
        reply_markup: {
            force_reply: true
        }
    })
        .then(gotTelephone=>{
            bot.onReplyToMessage(gotTelephone.chat.id, gotTelephone.message_id,  msg => {
                checkPhoneNumber(gotTelephone.chat.id, msg.text);
            })
        })
}
else {
    requestSms(id);
}
}

const TOKEN = config.botToken

const bot = new TelegramBot (TOKEN, {
    polling: true,
});



const COMMAND_TEMPLATE1 = 'template1';
const COMMAND_TEMPLATE2 = 'template2';
const COMMAND_TEMPLATE3 = 'template3';
const COMMAND_TEMPLATE4 = 'template4';
const COMMAND_TEMPLATE5 = 'template5';
const COMMAND_ADDTEMPLATE = 'addTemplate';

let inline_keyboard = [
    [
         {
            text: 'Blank template #1',
            callback_data: COMMAND_TEMPLATE1
        },
        {
            text: 'Blank template #2',
            callback_data: COMMAND_TEMPLATE2
        }

    ],[
        {
            text: 'Blank template #3',
            callback_data: COMMAND_TEMPLATE3
        },
        {
            text: 'Blank template #4',
            callback_data: COMMAND_TEMPLATE4
        },
        {
            text: 'Blank template #5',
            callback_data: COMMAND_TEMPLATE4
        }

    ],[
        {
            text: 'Add a template',
            callback_data: COMMAND_ADDTEMPLATE
        }
    ]
];

bot.onText(/\/start/,  (msg, [source, match])=> {
    const {chat: {id}} = msg;
                bot.sendMessage(id, `Enter the settings for the sms provider. api-id:`, {
                    reply_markup: {
                        force_reply: true
                    }
                }).then(addApiId => {
                    bot.onReplyToMessage(addApiId.chat.id, addApiId.message_id, msg => {
                        settings.api_id = msg.text;
                        bot.sendMessage(addApiId.chat.id, 'Choose a template',{
                            reply_markup:{
                                inline_keyboard
                            }
                        })
                    })
                })
});

bot.onText(regexp, (msg, [source, match]) =>{
    if (!phonenumber){
        const {chat: {id}} = msg;
        phonenumber = match;
        phonenumber = phonenumber.replace(/[\D]/g,'');
        phonenumber = (phonenumber.length == 10)? '+7' + phonenumber: '+7' + phonenumber.slice(1)

        bot.sendContact(id, phonenumber,'test').then((contact)=>console.log('contact', contact))

    }
})

bot.onText(regexp, (msg, [source, match]) =>{
    if (!phonenumber){
        const {chat: {id}} = msg;
        phonenumber = match;
        phonenumber = phonenumber.replace(/[\D]/g,'');
        phonenumber = (phonenumber.length == 10)? '+7' + phonenumber: '+7' + phonenumber.slice(1)

        bot.sendMessage(id, 'Select a template to send to the number:'+ phonenumber,{
            reply_markup:{
                inline_keyboard
            }
        })

    }
})

// Bot command to del
bot.onText(/\/settings/, (msg, [source, match]) =>{
    const {chat: {id}} = msg;
    let settingsMessage = (Object.keys(settings).length == 0) ? 'No settings. Please set settings by a /start command': settings;

    bot.sendMessage(id, 'sms api settings: '+ JSON.stringify(settingsMessage), {
    })
});

bot.onText(regexpKeyboard,(msg, [source, match])=>{
    const {chat: {id}} = msg;
    bot.sendMessage(id, 'Choose a template',{
        reply_markup:{
            inline_keyboard
        }
    })
});

bot.on('callback_query',  query=>{
    const {message: {chat, message_id, text}= {}} = query
    switch (query.data) {
        case COMMAND_TEMPLATE1:
            templates[0] ? sendTemplate(templates[0], chat.id) : bot.sendMessage(chat.id, 'You must enter the text of template No. 1');
            break
        case COMMAND_TEMPLATE2:
            templates[1] ? sendTemplate(templates[1], chat.id) : bot.sendMessage(chat.id, 'You must enter the text of template No. 2');
            break
        case COMMAND_TEMPLATE3:
            templates[2] ? sendTemplate(templates[2], chat.id) : bot.sendMessage(chat.id, 'You must enter the text of template No. 3');
            break
        case COMMAND_TEMPLATE4:
            templates[3] ? sendTemplate(templates[3], chat.id) : bot.sendMessage(chat.id, 'You must enter the text of template No. 4');
            break
        case COMMAND_TEMPLATE5:
            templates[4] ? sendTemplate(templates[4],chat.id) : bot.sendMessage(chat.id, 'You must enter the text of template No. 5');
            break

        case COMMAND_ADDTEMPLATE:

            bot.sendMessage(chat.id, `Enter template text No.${count+1}`, {
                reply_markup: {
                    force_reply: true
                }
            }).then(addTemplate => {
                const replyListenerId = bot.onReplyToMessage(addTemplate.chat.id, addTemplate.message_id, msg => {
                    bot.removeReplyListener(replyListenerId);
                        templates[count] = msg.text;
                    (count == 0) ? inline_keyboard[count][count].text = msg.text:
                        (count == 1) ? inline_keyboard[0][count].text = msg.text:
                            (count == 2) ? inline_keyboard[1][0].text = msg.text:
                                (count == 3) ? inline_keyboard[1][1].text = msg.text:
                                    (count == 4) ? inline_keyboard[1][2].text = msg.text: console.log(inline_keyboard)
                        count++
                    if (count>4) count = 0;
                    bot.editMessageText('Choose a template',{
                        chat_id: chat.id,
                        message_id:message_id,
                        reply_markup: {
                            inline_keyboard
                        }
                    })
                })
            })
            break
        default:
    }
    bot.answerCallbackQuery({
        callback_query_id: query.id
    })
})
