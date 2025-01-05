
import {useState,useCallback,useEffect,useMemo} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import parsePmsetToJSON from "../utils/parsePmsetToJSON";
import GPUSetter,{TGpuswitch} from './GPUSetter';
import HibernatemodeSetter,{THibernatemode} from './HibernatemodeSetter';
import SleepSetter,{TSleep} from './SleepSetter';
import HighstandbythresholdSetter,{THighstandbythreshold} from './HighstandbythresholdSetter';
import StandbydelaySetter,{TStandbydelay,TStandbydelayTypes} from './StandbydelaySetter';
import StanbySetter,{TStanbySwitch} from './StanbySetter';
import AutopoweroffSetter,{TAutopoweroffSwitch} from './AutopoweroffSetter';
import AutopoweroffdelaySetter,{TAutopoweroffdelay} from './AutopoweroffdelaySetter';

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

  async function updateHighstandbythreshold (value:THighstandbythreshold) {
    try{
      const result = await backend.sudoSetPmset(type,"highstandbythreshold",value.toString());
      console.log("highstandbythreshold update",result)
      await getPmset();
    }catch(error){
      throw(error);
    }
  }

  async function updateStanbySwitch (value:TStanbySwitch) {
    try{
      const result = await backend.sudoSetPmset(type,"stanby",value.toString());
      console.log("stanby update",result)
      await getPmset();
    }catch(error){
      throw(error);
    }
  }

  function getFuncOfUpdatStandbydelay (standbydelayType:TStandbydelayTypes) {
    const suffix = standbydelayType===TStandbydelayTypes.HIGH?"high":"low";
    async function updateStandbydelay (value:TStandbydelay) {
      try{
        const result = await backend.sudoSetPmset(type,`standbydelay${suffix}`,value.toString());
        console.log(`standbydelay${suffix} update`,result)
        await getPmset();
      }catch(error){
        throw(error);
      }
    }
    return updateStandbydelay;
  }

  async function updateAutopoweroffSwitch (value:TAutopoweroffSwitch) {
    try{
      const result = await backend.sudoSetPmset(type,"autopoweroff",value.toString());
      console.log("autopoweroff update",result)
      await getPmset();
    }catch(error){
      throw(error);
    }
  }

  async function updateAutopoweroffdelay (value:TAutopoweroffdelay) {
    try{
      const result = await backend.sudoSetPmset(type,`autopoweroffdelay`,value.toString());
      console.log(`autopoweroffdelay update`,result)
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
      {
        currentConfig?.highstandbythreshold!==undefined
        &&
        <HighstandbythresholdSetter
          value={currentConfig?.highstandbythreshold}
          onChange={updateHighstandbythreshold}
        />
      }
      {
        currentConfig?.standby!==undefined
        &&
        <StanbySetter
          value={currentConfig?.standby}
          onChange={updateStanbySwitch}
        />
      }
      {
        currentConfig?.standbydelayhigh!==undefined
        &&
        <StandbydelaySetter
          type={TStandbydelayTypes.HIGH}
          value={currentConfig?.standbydelayhigh}
          onChange={getFuncOfUpdatStandbydelay(TStandbydelayTypes.HIGH)}
        />
      }
      {
        currentConfig?.standbydelaylow!==undefined
        &&
        <StandbydelaySetter
          type={TStandbydelayTypes.LOW}
          value={currentConfig?.standbydelaylow}
          onChange={getFuncOfUpdatStandbydelay(TStandbydelayTypes.LOW)}
        />
      }
      {
        currentConfig?.autopoweroff!==undefined
        &&
        <AutopoweroffSetter
          value={currentConfig?.autopoweroff}
          onChange={updateAutopoweroffSwitch}
        />
      }
      {
        currentConfig?.autopoweroffdelay!==undefined
        &&
        <AutopoweroffdelaySetter
          value={currentConfig?.autopoweroffdelay}
          onChange={updateAutopoweroffdelay}
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