/**
 * 电量阈值设置
 * 当电量高于highstandbythreshold时,命中standbydelayhigh的设置,否则命中standbydelaylow的设置
 */
import ValueSlider,{TValue} from './commons/ValueSlider';

export type THighstandbythreshold = TValue;

interface TProps {
  value?:THighstandbythreshold;
  onChange:(value:THighstandbythreshold)=>void;
}

export default function HighstandbythresholdSetter(props:TProps) {
  const {value,onChange} = props;
  return (
    <ValueSlider
      title="Highstandbythreshold(电量阈值设置)"
      value={value}
      onChange={onChange}
      options={{
        unit:"%"
      }}
    />
  );
}