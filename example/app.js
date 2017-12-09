//Add the modules that are required

var restify = require('restify'); 
var builder = require('botbuilder'); 
var LUIS = require('luis-sdk'); 
var moment = require('moment');

// Setup Restify Server

var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3000, function () {

console.log("--------------------------------------------------------");
console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " | Bot is running with the address : "+server.url);

console.log("--------------------------------------------------------");
});

// Create chat bot

var	connector = new builder.ChatConnector({ 
	appId: "<bot-app-id>",
appPassword: "<bot-app-pwd>"
});

var bot = new builder.UniversalBot(connector);

var model = '<luis-model-publish-url>';

var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

server.post('/api/messages', connector.listen());

//=========================================================

//	Bots Dialogs //=========================================================

bot.dialog('/', dialog);

dialog.matches('intent.greeting',[

function(session,args)
{
session.send("Hi, I'm  Erin! How may I help you?");

}
]); 
dialog.matches('intent.capabilities',[

function(session,args){
if(args.entities.length==0)
{
session.dialogData.num='';
session.beginDialog('/name', session.dialogData.num);
session.dialogData.num;


}
else{
	session.dialogData.num=args.entities[0].entity;


}
}
]);
bot.dialog('/name',[

function(session, args, next){
if(args=="")
{
	session.beginDialog('/askname', session.dialogData.num);


}
else
{
	next(args);


}
},
function(session, args, next)
{
session.endDialog();
}
]);
var n; 
var name={};
bot.dialog('/askname',[

function(session, args)
{
builder.Prompts.text(session, "I can recognize your name and id. Please enter your name");
},
function(session, args, results)
{
session.dialogData.num=args.response;
session.send("Hi" +session.dialogData.num+". Please enter your ID");
session.endDialog();
session.endConversation();
}
]); 
dialog.matches('intent.id',[

function(session,args){

session.send("Your Id is"+args.entities[0].entity+". Welcome to Digital Summit);
}

]); 
dialog.matches('intent.thankyou',[

function(session,args){

session.send("My pleasure, have a great day!");
}

]);

dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I'm the Erin Bot, how can I help you? "));
