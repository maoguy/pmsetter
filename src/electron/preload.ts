import { contextBridge, ipcRenderer } from "electron";
import { exec } from 'child_process';

export const backend = {
  nodeVersion: async (msg: string): Promise<string> =>
    await ipcRenderer.invoke("node-version", msg),
  getPmset: async()=>{
    return await ipcRenderer.invoke("get-pmset")
  },
  sudoGetPmset: async()=>{
    return await ipcRenderer.invoke("sudo-get-pmset")
  }
};

contextBridge.exposeInMainWorld("backend", backend);
