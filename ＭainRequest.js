var Cache = CacheService.getPublicCache();
var CHANNEL_ACCESS_TOKEN = 'YOUR_LINE_ACCESS_TOKEN';

/**
 *  Function for Get request
 *  
 */
function doGet(e) 
{
  var CmdCodeFromCache = GetCommandFromCache();
  if(CmdCodeFromCache == 0xFF)
    return;
  console.log("GET::CommandCode " + CmdCodeFromCache);
  return SendCommandByReturn(CmdCodeFromCache);
}

/**
 *  Function for Post request
 *  
 */
function doPost(e) 
{
  var msg;
  var replyToken;
  var userMessage;
  var CommandCode;
  
  /**
   *  Check if the is command from IFTTT
   */
  if(e.parameter.command)
  {
    console.log("This is from Google x IFTTT");
    userMessage = e.parameter.command;
    CommandCode = CheckCmdAvailable(userMessage);
  }
  /// Or the command from LINE
  else
  {
    msg = JSON.parse(e.postData.contents);
    // Get the replayToken and message received
    replyToken  = msg.events[0].replyToken;
    userMessage = msg.events[0].message.text;
    // console.log(msg);
    
    if(typeof replyToken === 'undefined')
      return;

    CommandCode = CheckCmdAvailable(userMessage);
    if(CommandCode == 0xFF)
    {
      replyText(msg, 'Command Not Supported!');
      return;
    }
    else if(CommandCode == 0x1F)
    {
      replyButton(msg, 'ON or OFF');
      return;
    }
    else
    {
      replyText(msg, 'Executing '+userMessage);
    }
  }

  /// Put the command into cache so GET function may receive it (2018/07)
  Cache.put('Command', userMessage);
}

function replyText(e, replayMessage)
{
  var url = 'https://api.line.me/v2/bot/message/reply';
  var jsonMessage;
  var replyData;
  
  jsonMessage = 
  {
    'replyToken': e.events[0].replyToken,
    'messages':
    [{
      'type': 'text',
      'text': replayMessage,
    }]
  };
  
  replyData = 
  {
    'headers': 
    {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify(jsonMessage)
  };
  
  UrlFetchApp.fetch(url,replyData);
}

function replyButton(e, titleMessage)
{
  var url = 'https://api.line.me/v2/bot/message/reply';
  var jsonMessage;
  var replyData;
  
  jsonMessage = 
  {
    'replyToken': e.events[0].replyToken,
    'messages':
    [{
      "type": "template",
      "altText": "This is the Light Control",
      "template": 
      {
        "type": "confirm",
        "actions": [
        {
          "type": "message",
          "label": "ON",
          "text": e.events[0].message.text + " On"
        },
        {
          "type": "message",
          "label": "OFF",
          "text": e.events[0].message.text + " Off"
        }],
        "text": e.events[0].message.text + ' ' + titleMessage
      }
    }]
  }
  
  replyData = 
  {
    'headers': 
    {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify(jsonMessage)
  };
  
  UrlFetchApp.fetch(url,replyData);
}