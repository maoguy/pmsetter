import { useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [nodeVersion, setNodeVersion] = useState<string | undefined>(undefined);
  const [pmsetStr,setPmsetStr] = useState<string>("");

  const updateNodeVersion = useCallback(
    async () =>
      setNodeVersion(await backend.nodeVersion("Hello from App.tsx!")),
    []
  );

  const getPmset = useCallback(
    async () => {
      const result = await backend.getPmset();
      console.log("getPmset",result);
      setPmsetStr(result);
    },
    []
  );

  const sudoGetPmset = useCallback(
    async () => {
      const result = await backend.sudoGetPmset();
      console.log("sudoGetPmset",result);
      setPmsetStr(result);
    },
    []
  );

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="./vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <button onClick={updateNodeVersion}>
          Node version is {nodeVersion}
        </button>
        <button onClick={getPmset}>
          getPmset
        </button>
        <button onClick={sudoGetPmset}>
          sudoGetPmset
        </button>
        <button onClick={()=>setPmsetStr("")}>
          clearPmset
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h3>pmset:</h3>
      <pre>
        {
          pmsetStr
        }
      </pre>
    </div>
  );
}

export default App;
