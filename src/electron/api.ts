import { ipcMain, IpcMainInvokeEvent } from "electron";
import execAsync from "./utils/execAsync";
import execSudoAsync from "./utils/execSudoAsync";

ipcMain.handle(
  "node-version",
  (event: IpcMainInvokeEvent, msg: string): string => {
    console.log(event);
    console.log(msg);

    return process.versions.node;
  }
);

ipcMain.handle(
  "get-pmset",
  async(event: IpcMainInvokeEvent, msg: string):Promise<string>=>{
    console.log("get-pmset")
    try {
      // 使用 await 等待命令执行完成
      const { stdout, stderr } = await execAsync('pmset -g custom');
      if (stderr) {
        throw(`stderr: ${stderr}`);
      }
      return (stdout);
    } catch (error) {
      throw(`执行出错: ${error}`);
    }
  }
);

ipcMain.handle(
  "sudo-get-pmset",
  async(event: IpcMainInvokeEvent, msg: string):Promise<string>=>{
    try {
      const { stdout, stderr } = await execSudoAsync("pmset -g custom");
      if(stderr) {
        throw(`stderr: ${stderr}`);
      }
      return stdout;
    } catch (error) {
      throw(`执行出错: ${error}`);
    }
  }
);

ipcMain.handle(
  "sudo-set-pmset",
  async (
    event: IpcMainInvokeEvent,
    powerType:"BATTERY"|"AC",
    settingKey:string,
    settingValue:string
  ) :Promise<string> => {
    const sudoCommand = `pmset -${powerType==="BATTERY"?"b":"c"} ${settingKey} ${settingValue}`;
    try {
      const { stdout, stderr } = await execSudoAsync(sudoCommand);
      if(stderr) {
        throw(`stderr: ${stderr}`);
      }
      return stdout;
    } catch (error) {
      throw(`执行出错: ${error}`);
    }
  }
)

ipcMain.handle(
  "sudo-reset-pmset",
  async (
    event: IpcMainInvokeEvent,
  ) :Promise<string> => {
    const sudoCommand = `pmset restoredefaults`;
    try {
      const { stdout, stderr } = await execSudoAsync(sudoCommand);
      if(stderr) {
        throw(`stderr: ${stderr}`);
      }
      return stdout;
    } catch (error) {
      throw(`执行出错: ${error}`);
    }
  }
)
