# Build a Skype Bot with Microsoft Bot Framework

This document will have all the links, code snippets and notes that you will need to complete the lab - Build a Skype Bot with Microsoft Bot Framework.

## Important Links

• Access to Microsoft LUIS - https://www.luis.ai/home

• Access to Bot Framework - https://dev.botframework.com/bots/new

• Downlaod Node JS - https://nodejs.org/en/download/

• Install ngrok - https://ngrok.com/download

• Create a Skype account - https://www.skype.com/en/new/

## Node JS Commands

### For creating package.json file

```
npm init
```

### To install restify module

```
npm install restify
```

### To install luis-sdk module

```
npm install luis-sdk
```

### To install ping module

```
npm install ping
```

### To install bot builder module

```
npm install botbuilder
```

### To install moment module

```
npm install moment
```



## Code Snippets

##Set up Restify Server and Create Chat bot

     var bot = new builder.UniversalBot(connector);
     var server = restify.createServer();
     server.listen(process.env.port || process.env.PORT || 3000, function ()
     {
       console.log(moment().format('MMMM Do YYYY, hh:mm:ss a') + " |  Erin is running with the address : " + server.url);
     });
    var connector = new builder.ChatConnector({
    appId: "<bot-app-id>",
    appPassword: "<bot-app-pwd>"
	});

    var bot = new builder.UniversalBot(connector);
    var model='<luis-model-publish-url>';
    var recognizer = new builder.LuisRecognizer(model);
    var dialog = new builder.IntentDialog({
    recognizers: [recognizer]
    });
    var n = 0;
    server.post('/api/messages', connector.listen());
    bot.dialog('/', dialog);

##Bot Dialogs

    dialog.matches('<your intent name>', [
    function (session, args) {
        session.send("<your response>");
		}
      ]);
