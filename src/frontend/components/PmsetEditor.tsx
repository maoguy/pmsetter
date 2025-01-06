
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
import DisplaysleepSetter,{TDisplaysleep} from './DisplaysleepSetter';
import LessbrightSetter,{TLessbrightSwitch} from './LessbrightSetter';
import DisksleepSetter,{TDisksleep} from './DisksleepSetter';
import AcwakeSetter,{TAcwakeSwitch} from './AcwakeSetter';
import HalfdimSetter,{THalfdimSwitch} from './HalfdimSetter';
import LidwakeSetter, { TLidwakeSwitch } from './LidwakeSetter';
import PowernapSetter, { TPowernapSwitch } from './PowernapSetter';
import TtyskeepawakeSetter, { TTtyskeepawakeSwitch } from './TtyskeepawakeSetter';
import WompSetter, { TWompSwitch } from './WompSetter';
import Snackbar from '@mui/material/Snackbar';

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
  const [errorMsg,setErrorMsg] = useState<string|undefined>();

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

  function getFuncOfUpdatStandbydelay (standbydelayType:TStandbydelayTypes) {
    const suffix = standbydelayType===TStandbydelayTypes.HIGH?"high":"low";
    const updateStandbydelay = getUpdateFunc<TStandbydelay>(`standbydelay${suffix}`);
    return updateStandbydelay;
  }

  function getUpdateFunc<TValue>(key:string) {
    async function updateValue (value:TValue) {
      try{
        const result = await backend.sudoSetPmset(type,key,(value as any).toString());
        console.log(`${key} update`,result);
        await getPmset();
      }catch(error){
        console.log(error)
        setErrorMsg((error as any).toString());
        throw(error);
      }
    }
    return updateValue;
  }

  function clearErrorMsg () {
    //清空错误信息
    setErrorMsg(undefined);
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
          onChange={getUpdateFunc<TGpuswitch>('gpuswitch')}
        />
      }
      {
        currentConfig?.hibernatemode!==undefined
        &&
        <HibernatemodeSetter
          value={currentConfig?.hibernatemode}
          onChange={getUpdateFunc<THibernatemode>("hibernatemode")}
        />
      }
      {
        currentConfig?.sleep!==undefined
        &&
        <SleepSetter
          value={currentConfig?.sleep}
          onChange={getUpdateFunc<TSleep>("sleep")}
        />
      }
      {
        currentConfig?.displaysleep!==undefined
        &&
        <DisplaysleepSetter
          value={currentConfig?.displaysleep}
          onChange={getUpdateFunc<TDisplaysleep>("displaysleep")}
        />
      }
      {
        currentConfig?.disksleep!==undefined
        &&
        <DisksleepSetter
          value={currentConfig?.disksleep}
          onChange={getUpdateFunc<TDisksleep>("disksleep")}
        />
      }
      {
        currentConfig?.highstandbythreshold!==undefined
        &&
        <HighstandbythresholdSetter
          value={currentConfig?.highstandbythreshold}
          onChange={getUpdateFunc<THighstandbythreshold>("highstandbythreshold")}
        />
      }
      {
        currentConfig?.standby!==undefined
        &&
        <StanbySetter
          value={currentConfig?.standby}
          onChange={getUpdateFunc<TStanbySwitch>("standby")}
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
          onChange={getUpdateFunc<TAutopoweroffSwitch>("autopoweroff")}
        />
      }
      {
        currentConfig?.autopoweroffdelay!==undefined
        &&
        <AutopoweroffdelaySetter
          value={currentConfig?.autopoweroffdelay}
          onChange={getUpdateFunc<TAutopoweroffdelay>("autopoweroffdelay")}
        />
      }

      {
        currentConfig?.lidwake!==undefined
        &&
        <LidwakeSetter
          value={currentConfig?.lidwake}
          onChange={getUpdateFunc<TLidwakeSwitch>("lidwake")}
        />
      }

      {
        currentConfig?.halfdim!==undefined
        &&
        <HalfdimSetter
          value={currentConfig?.halfdim}
          onChange={getUpdateFunc<THalfdimSwitch>("halfdim")}
        />
      }

      {
        currentConfig?.lessbright!==undefined
        &&
        <LessbrightSetter
          value={currentConfig?.lessbright}
          onChange={getUpdateFunc<TLessbrightSwitch>("lessbright")}
        />
      }

      {
        currentConfig?.acwake!==undefined
        &&
        <AcwakeSetter
          value={currentConfig?.acwake}
          onChange={getUpdateFunc<TAcwakeSwitch>("acwake")}
        />
      }

      {
        currentConfig?.powernap!==undefined
        &&
        <PowernapSetter
          value={currentConfig?.powernap}
          onChange={getUpdateFunc<TPowernapSwitch>("powernap")}
        />
      }

      {
        currentConfig?.ttyskeepawake!==undefined
        &&
        <TtyskeepawakeSetter
          value={currentConfig?.ttyskeepawake}
          onChange={getUpdateFunc<TTtyskeepawakeSwitch>("ttyskeepawake")}
        />
      }

      {
        currentConfig?.womp!==undefined
        &&
        <WompSetter
          value={currentConfig?.womp}
          onChange={getUpdateFunc<TWompSwitch>("womp")}
        />
      }

      {
        <Snackbar
          open={errorMsg!==undefined}
          autoHideDuration={2000}
          onClose={clearErrorMsg}
          message={errorMsg}
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