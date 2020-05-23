/**
 *  Get the command from cache and return its command code
 */
 function GetCommandFromCache()
 {
    var command = Cache.get('Command');
    Cache.remove('Command');
    
    if(command == null)
      return 0xFF;

    return CheckCmdAvailable(command);
 }

/**
 *  When sending the command by return of HTTP GET method
 */
function SendCommandByReturn(CommandCode)
{
  return ContentService.createTextOutput(GetCommand(CommandCode));
}

/**
 *  Function to check if command is available
 *
 */
function CheckCmdAvailable(Command)
{
  console.log("CheckCmdAvailable::Command = " + Command);
  Command = Command.toLowerCase();
  switch(Command)
  {
    /// Living Light
    case "living light off":
    case "light off":
    case "客廳燈關":
    case "リービング電気消して":
      DisplayLCD('Living Light', 'OFF');
      return 0x10;
    case "living light on":
    case "light on":
    case "客廳燈開":
    case "リービング電気つけて":
      DisplayLCD('Living Light', 'ON');
      return 0x11;
    case "living light full":
    case "light all":
    case "客廳燈全開":
    case "リービング電気全開":
      DisplayLCD('Living Light', 'Full');
      return 0x12;
    case "living light white":
    case "客廳燈白":
    case "light white":
    case "リービング電気白い":
      DisplayLCD('Living Light', 'White');
      return 0x13;
    case "living light yellow":
    case "light yellow":
    case "客廳燈黃":
    case "リービング電気暖かい":
      DisplayLCD('Living Light', 'Warm');
      return 0x14;
    /// Dining Light  
    case "dining light off":
    case "dining off":
    case "飯廳燈關":
    case "ダイニング電気消して":
      DisplayLCD('Dining Light', 'OFF');
      return 0x15;
    case "dining light on":
    case "dining on":
    case "飯廳燈開":
    case "ダイニング電気つけて":
      DisplayLCD('Dining Light', 'ON');
      return 0x16;
    case "dining light full":
    case "飯廳燈全開":
    case "ダイニング電気全開":
      DisplayLCD('Dining Light', 'Full');
      return 0x17;
    case "dining light sleep":
    case "飯廳燈睡":
    case "ダイニング電気夜":
      DisplayLCD('Dining Light', 'Sleep');
      return 0x18;
    /// Room Light
    case "room light off":
    case "room off":
    case "房間燈關":
    case "ルーム電気消して":
      DisplayLCD('Bedroom Light', 'OFF');
      return 0x19;
    case "room light on":
    case "room on":
    case "房間燈開":
    case "ルーム電気つけて":
      DisplayLCD('Bedroom Light', 'ON');
      return 0x1A;
    case "room light full":
    case "房間燈全開":
    case "ルーム電気全開":
      DisplayLCD('Bedroom Light', 'Full');
      return 0x1B;
    case "room light sleep":
    case "room sleep":
    case "房間燈睡":
    case "ルーム電気夜":
      DisplayLCD('Bedroom Light', 'Sleep');
      return 0x1C;
    case "living light":
    case "dining light":
    case "room light":
      return 0x1F;
    /// TV
    case "turn on the tv":
    case "turn off the tv":
    case "打開電視":
    case "關電視":
    case "テレビつけて":
    case "テレビ消して":
      DisplayLCD('TV', 'ON/OFF');
      return 0x40;
    case "input":
      return 0x50;
    case "hdmi 1":
      Cache.put('Command', "ch 4");
      return 0x50;
    case "hdmi 2":
      Cache.put('Command', "ch 5");
      return 0x50;
    case "hdmi 3":
      Cache.put('Command', "ch 6");
      return 0x50;
    case "ch 1":
    case "nhk":
      DisplayLCD('TV', 'CH1');
      return 0x41;
    case "ch 2":
      DisplayLCD('TV', 'CH2');
      return 0x42;
    case "ch 3":
      DisplayLCD('TV', 'CH3');
      return 0x43;
    case "ch 4":
    case "日テレ":
      DisplayLCD('TV', 'CH4/HDMI1');
      return 0x44;
    case "ch 5":
    case "asahi":
      DisplayLCD('TV', 'CH5/HDMI2');
      return 0x45;
    case "ch 6":
    case "tbs":
      DisplayLCD('TV', 'CH6/HDMI3');
      return 0x46;
    case "ch 7":
    case "tv tokyo":
      DisplayLCD('TV', 'CH7');
      return 0x47;
    case "ch 8":
    case "fuji":
      DisplayLCD('TV', 'CH8');
      return 0x48;
    case "ch 9":
      DisplayLCD('TV', 'CH9');
      return 0x49;
    case "ch 10":
      DisplayLCD('TV', 'CH10');
      return 0x4A;
    case "ch 11":
      DisplayLCD('TV', 'CH11');
      return 0x4B;
    case "ch 12":
      DisplayLCD('TV', 'CH12');
      return 0x4C;
    case "ch up":
      DisplayLCD('TV', 'Ch Up');
      return 0x4D;
    case "ch down":
      DisplayLCD('TV', 'Ch Down');
      return 0x4E
    case "vol up":
      DisplayLCD('TV', 'Volume Up');
      return 0x51;
    case "vol down":
      DisplayLCD('TV', 'Volume Down');
      return 0x52;
    case "mute":
      DisplayLCD('TV', 'Mute');
      return 0x53;
    case "red":
      DisplayLCD('TV', 'Red');
      return 0x54;
    case "green":
      DisplayLCD('TV', 'Green');
      return 0x55;
    case "blue":
      DisplayLCD('TV', 'Blue');
      return 0x56;
    /// Air conditioner
    case "aircon off":
    case "關冷氣":
    case "エアコン消す":
      DisplayLCD('Aircon', 'OFF');
      return 0x90;
    case "cold":
    case "冷氣":
    case "冷房":
      DisplayLCD('Aircon', 'Cooler');
      return 0x91;
    case "heater":
    case "暖氣":
    case "暖房":
      DisplayLCD('Aircon', 'Heater');
      return 0x92;
    case "humi":
    case "除濕":
    case "除湿":
      DisplayLCD('Aircon', 'Humi');
      return 0x93;
    case "conf":
    case "舒適":
    case "快適":
      DisplayLCD('Aircon', 'Conf');
      return 0x94;
    case "clean":
    case "空清":
    case "空気清浄":
      DisplayLCD('Aircon', 'Clean');
      return 0x95;
    case "temp up":
    case "升溫":
    case "温度アプ":
      DisplayLCD('Aircon', 'Temp Up');
      return 0x96;
    case "temp down":
    case "降溫":
    case "温度ダウン":
      DisplayLCD('Aircon', 'Temp Down');
      return 0x97;
    /// Combination
    case "good night":
    case "晚安":
    case "おやすみ":
      Cache.put('Command', "night1");
      return 0x10;
    case "night1":
      Cache.put('Command', "dining light off");
      return 0x19;
    case "welcome":
      Cache.put('Command', "turn on the tv");
      return 0x11;
    case "sunday":
      Cache.put('Command', "sunday1");
      return 0x12;
    case "sunday1":
      Cache.put('Command', "room light full");
      return 0x17;
    default:
      return 0xFF;
  }
}