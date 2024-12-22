import { useCallback, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import parsePowerSettings from "./utils/parsePmsetToJSON";
import Button from '@mui/material/Button';

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
      try{
        const result = await backend.getPmset();
        console.log("getPmset",parsePowerSettings(result));
        setPmsetStr(result);
      }catch(error){
        throw error;
      }
    },
    []
  );

  const sudoGetPmset = useCallback(
    async () => {
      try{
        const result = await backend.sudoGetPmset();
        console.log("sudoGetPmset",result);
        setPmsetStr(result);
      }catch(error){
        throw(error);
      }
    },
    []
  );

  return (
    <div className="App">
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
        <Button
          variant="contained"
          onClick={getPmset}
        >
          getPmset
        </Button>
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
