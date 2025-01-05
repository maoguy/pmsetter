/**
 * stanby时间设置
 * 当电量高于highstandbythreshold时,命中standbydelayhigh的设置,否则命中standbydelaylow的设置
 */
import ValueSlider,{TValue} from './commons/ValueSlider';

export type TStandbydelay = TValue;
export enum TStandbydelayTypes {
  HIGH="HIGH",
  LOW="LOW",
} 

interface TProps {
  type:TStandbydelayTypes;
  value?:TStandbydelay;
  onChange:(value:TStandbydelay)=>void;
}

export default function TStandbydelaySetter(props:TProps) {
  const {type,value,onChange} = props;
  return (
    <ValueSlider
      title={
        type===TStandbydelayTypes.HIGH
        ?
        "Standbydelayhigh(电量高于阈值的时休眠前等待时间)"
        :
        "Standbydelaylow(电量低于阈值的时休眠前等待时间)"
      }
      value={value}
      onChange={onChange}
      options={{
        unit:"秒钟",
        MAX:86400
      }}
    />
  );
}