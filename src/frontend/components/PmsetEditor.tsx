
import {useState,useCallback,useEffect,useMemo} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import parsePmsetToJSON from "../utils/parsePmsetToJSON";
import GPUSetter,{TGpuswitch} from './GPUSetter';
import HibernatemodeSetter,{THibernatemode} from './HibernatemodeSetter';
import SleepSetter,{TSleep} from './SleepSetter';

export enum PmsetTypes {
  BATTERY = "BATTERY",
  AC = "AC",
}

interface TProps {
  type:PmsetTypes;
}

const PmsetEditor = (props:TProps) => {
  const {type} = props;
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [pmsetStr,setPmsetStr] = useState<string>("");
  
  const pmsetJSON = useMemo(()=>{
    return parsePmsetToJSON(pmsetStr);
  },[pmsetStr]);

  const batteryConfig = useMemo(()=>{
    return pmsetJSON?.["BatteryPower"];
  },[pmsetJSON]);
  const acConfig = useMemo(()=>{
    return pmsetJSON?.["ACPower"];
  },[pmsetJSON]);

  const currentConfig = useMemo(()=>{
    return pmsetJSON?.[type===PmsetTypes.BATTERY?"BatteryPower":"ACPower"]
  },[pmsetJSON]);

  const getPmset = useCallback(
    async () => {
      setIsLoading(true);
      try{
        const result = await backend.getPmset();
        console.log("getPmset",parsePmsetToJSON(result));
        setPmsetStr(result);
      }catch(error){
        throw error;
      }
      setIsLoading(false);
    },
    []
  );

  async function updatePmsetGpuswitch (value:TGpuswitch) {
    try{
      const result = await backend.sudoSetPmset(type,"gpuswitch",value.toString());
      console.log("gpuswitch update",result)
      await getPmset();
    }catch(error){
      throw(error);
    }
  }

  async function updateHibernatemode (value:THibernatemode) {
    try{
      const result = await backend.sudoSetPmset(type,"hibernatemode",value.toString());
      console.log("hibernatemode update",result)
      await getPmset();
    }catch(error){
      throw(error);
    }
  }
  
  async function updateSleep (value:TSleep) {
    try{
      const result = await backend.sudoSetPmset(type,"sleep",value.toString());
      console.log("sleep update",result)
      await getPmset();
    }catch(error){
      throw(error);
    }
  }

  useEffect(()=>{
    //初始化时调用
    getPmset();
  },[]);

  return (
    <>
      {
        isLoading
        &&
        <LinearProgress/>
      }
      {
        currentConfig?.gpuswitch!==undefined
        &&
        <GPUSetter
          value={currentConfig?.gpuswitch}
          onChange={updatePmsetGpuswitch}
        />
      }
      {
        currentConfig?.hibernatemode!==undefined
        &&
        <HibernatemodeSetter
          value={currentConfig?.hibernatemode}
          onChange={updateHibernatemode}
        />
      }
      {
        currentConfig?.sleep!==undefined
        &&
        <SleepSetter
          value={currentConfig?.sleep}
          onChange={updateSleep}
        />
      }
      
      {/* <pre>
      {
        JSON.stringify(currentConfig,null,2)
      }
      </pre> */}
    </>
  );
}

export default PmsetEditor;