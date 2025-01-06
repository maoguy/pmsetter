/**
 * 开盖时是否唤醒
 * lidwake:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type TLidwakeSwitch = TValue;

interface TProps {
  value?:TLidwakeSwitch;
  onChange:(value:TLidwakeSwitch)=>void;
}

export default function LidwakeSetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Lidwake(开盖)"
      value={value}
      onChange={onChange}
      options={{
        tips:"开盖时是否唤醒"
      }}
    />
  );
}