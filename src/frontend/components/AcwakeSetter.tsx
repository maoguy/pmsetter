/**
 * 电源改变时唤醒，也就是插上或者拔掉外置电源时唤醒Mac
 * acwake:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type TAcwakeSwitch = TValue;

interface TProps {
  value?:TAcwakeSwitch;
  onChange:(value:TAcwakeSwitch)=>void;
}

export default function AcwakeSetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Acwake(电源改变时唤醒)"
      value={value}
      onChange={onChange}
      options={{
        tips:"插上或者拔掉外置电源时唤醒Mac"
      }}
    />
  );
}