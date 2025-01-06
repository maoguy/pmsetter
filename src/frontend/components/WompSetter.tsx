/**
 * 网络唤醒
 * womp:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type TWompSwitch = TValue;

interface TProps {
  value?:TWompSwitch;
  onChange:(value:TWompSwitch)=>void;
}

export default function WompSetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Womp(网络唤醒)"
      value={value}
      onChange={onChange}
      options={{
        tips:"是否允许网络唤醒"
      }}
    />
  );
}