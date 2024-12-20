import { ipcMain, IpcMainInvokeEvent } from "electron";
import { exec } from 'child_process';
const sudo =require ('sudo-prompt');

// 将 exec 函数转换为返回 Promise 的函数
// 创建一个返回 Promise 的函数来包装 exec
function execAsync(command:string):any {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // 如果有错误，拒绝 Promise
        reject(error);
        return;
      }
      // 如果没有错误，解析 Promise 并返回 stdout 和 stderr
      resolve({ stdout, stderr });
    });
  });
}

function execSudoAsync(command:string):any {
  return new Promise((resolve,reject)=>{
    const options = { name: 'your Electron App' };
    sudo.exec('pmset -g', options,
        function(error:any, stdout:any, stderr:any) {
          if (error) {
            reject(`${error}`);
            throw error
          };
          resolve('输出: ' + stdout);
        }
      );
  });
}

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
    try {
      // 使用 await 等待命令执行完成
      const { stdout, stderr } = await execAsync('pmset -g');
      if (stderr) {
        return(`stderr: ${stderr}`);
      }
      return (`当前电源设置:\n${stdout}`);
    } catch (error) {
      return(`执行出错: ${error}`);
    }
  }
);

ipcMain.handle(
  "sudo-get-pmset",
  async(event: IpcMainInvokeEvent, msg: string):Promise<string>=>{
    try {
      const result = await execSudoAsync("pmset -g");
      return result;
    } catch (error) {
      return `error:${error}`;
    }
  }
);