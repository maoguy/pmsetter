import { contextBridge, ipcRenderer } from "electron";

export const backend = {
  nodeVersion: async (msg: string): Promise<string> =>
    await ipcRenderer.invoke("node-version", msg),
  getPmset: async():Promise<string> =>{
    return await ipcRenderer.invoke("get-pmset")
  },
  sudoGetPmset: async():Promise<string> =>{
    return await ipcRenderer.invoke("sudo-get-pmset")
  },
  sudoSetPmset: async (
    powerType:"BATTERY"|"AC",
    settingKey:string,
    settingValue:string
  ): Promise<string> => {
    return await ipcRenderer.invoke("sudo-set-pmset",powerType,settingKey,settingValue);
  },
  sudoResetPmset: async (): Promise<string> => {
    return await ipcRenderer.invoke("sudo-reset-pmset");
  }
};

contextBridge.exposeInMainWorld("backend", backend);
