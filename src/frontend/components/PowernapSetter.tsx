/**
 * 小憩
 * powernap:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type TPowernapSwitch = TValue;

interface TProps {
  value?:TPowernapSwitch;
  onChange:(value:TPowernapSwitch)=>void;
}

export default function PowernapSetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Powernap(小憩)"
      value={value}
      onChange={onChange}
      options={{
        tips:"是否允许电源小憩"
      }}
    />
  );
}