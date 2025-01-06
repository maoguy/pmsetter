/**
 * 有活跃的 tty（终端会话）时不休眠
 * ttyskeepawake:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type TTtyskeepawakeSwitch = TValue;

interface TProps {
  value?:TTtyskeepawakeSwitch;
  onChange:(value:TTtyskeepawakeSwitch)=>void;
}

export default function TtyskeepawakeSetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Ttyskeepawake(终端会话)"
      value={value}
      onChange={onChange}
      options={{
        tips:"有活跃的 tty（终端会话）时不休眠"
      }}
    />
  );
}