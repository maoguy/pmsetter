/**
 * 使用电池时使显示器亮度暗一点
 * lessbright:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type TLessbrightSwitch = TValue;

interface TProps {
  value?:TLessbrightSwitch;
  onChange:(value:TLessbrightSwitch)=>void;
}

export default function LessbrightSetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Lessbright(显示器亮度)"
      value={value}
      onChange={onChange}
      options={{
        tips:"使用电池时使显示器亮度暗一点"
      }}
    />
  );
}