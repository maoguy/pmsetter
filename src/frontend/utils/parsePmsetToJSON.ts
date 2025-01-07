type TSwitch = 0|1;

interface PowerSettings {
  lidwake?: TSwitch;
  autopoweroff?: TSwitch;
  stanbydelay?:number;
  standbydelayhigh?: number;
  autopoweroffdelay?: number;
  standbydelaylow?: number;
  standbydelay?: number;
  standby?: TSwitch;
  proximitywake?: number;
  hibernatemode?: number;
  powernap?: TSwitch;
  gpuswitch?: number;
  sleep?:number;
  hibernatefile?: string;
  ttyskeepawake?: TSwitch;
  highstandbythreshold?: number;
  displaysleep?: number;
  womp?: TSwitch;
  networkoversleep?: number;
  acwake?: TSwitch;
  halfdim?: TSwitch;
  lessbright?: TSwitch;
  tcpkeepalive?: number;
  disksleep?: number;
}
  
interface BatteryACPowerSettings {
  BatteryPower: PowerSettings;
  ACPower: PowerSettings;
}
  
function isStringInteger(str:string) {
  if (typeof str !== 'string') {
    return false; // 确保输入是字符串
  }
  const num = parseInt(str, 10); // 尝试将字符串转换为整数
  return Number.isInteger(num) && num.toString() === str; // 检查是否为整数且转换前后值相等
}
  
function parsePmsetToJSON(input: string): BatteryACPowerSettings {
  const settings: BatteryACPowerSettings = { BatteryPower: {}, ACPower: {} };
  let currentSection:"BatteryPower"|"ACPower" = 'BatteryPower';

  const lines = input.split('\n');
  lines.forEach(line => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('AC Power:')) {
      currentSection = 'ACPower';
      return;
    }

    if (trimmedLine.startsWith('Battery Power:')) {
      currentSection = 'BatteryPower';
      return;
    }

    if (trimmedLine === '' || trimmedLine.startsWith(' ')) {
      return;
    }

    const match = trimmedLine.match(/(\w+)\s+(\S+)/);
    if (match) {
      const key = match[1] as keyof PowerSettings;
      const value = match[2];
      (settings as any)[currentSection][key] = isStringInteger(value) ? parseInt(value, 10) : value;
    }
  });

  return settings;
}

export default parsePmsetToJSON;

// 示例字符串
const powerSettingsString = `
Battery Power:
  lidwake              1
  autopoweroff         1
  standbydelayhigh     86400
  autopoweroffdelay    259200
  standbydelaylow      10800
  standby              1
  proximitywake        0
  hibernatemode        3
  powernap             0
  gpuswitch            2
  hibernatefile        /var/vm/sleepimage
  ttyskeepawake        1
  highstandbythreshold 50
  displaysleep         2
  sleep                1
  acwake               0
  halfdim              1
  lessbright           1
  tcpkeepalive         1
  disksleep            10
AC Power:
  lidwake              1
  autopoweroff         1
  standbydelayhigh     86400
  autopoweroffdelay    259200
  standbydelaylow      10800
  standby              1
  proximitywake        1
  hibernatemode        3
  powernap             1
  gpuswitch            2
  hibernatefile        /var/vm/sleepimage
  ttyskeepawake        1
  highstandbythreshold 50
  womp                 1
  displaysleep         10
  networkoversleep     0
  sleep                1
  acwake               0
  halfdim              1
  tcpkeepalive         1
  disksleep            10
`;
  
// 使用函数并打印结果
//   const parsedSettings = parsePowerSettings(powerSettingsString);
//   console.log(JSON.stringify(parsedSettings, null, 2));