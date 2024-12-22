const sudo =require ('sudo-prompt');

// 将 exec 函数转换为返回 Promise 的函数
// 创建一个返回 Promise 的函数来包装 exec
function execSudoAsync(command:string):any {
  return new Promise((resolve,reject)=>{
    const options = { name: 'pmsetter' };
    sudo.exec(command, options,
        function(error:any, stdout:any, stderr:any) {
          if (error) {
            // 如果有错误，拒绝 Promise
            reject(`${error}`);
            return;
            // throw error
          };
          // 如果没有错误，解析 Promise 并返回 stdout 和 stderr
          resolve({ stdout, stderr });
        }
      );
  });
}

export default execSudoAsync;