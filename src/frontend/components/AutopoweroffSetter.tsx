/**
 * autopoweroff:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type TAutopoweroffSwitch = TValue;

interface TProps {
  value?:TAutopoweroffSwitch;
  onChange:(value:TAutopoweroffSwitch)=>void;
}

export default function AutopoweroffSetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Autopoweroff(自动断电)"
      value={value}
      onChange={onChange}
      options={{
        tips:"是否启用autopoweroff模式"
      }}
    />
  );
}