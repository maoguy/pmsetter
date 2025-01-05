/**
 * 睡眠等待时间
 */
import ValueSlider,{TValue} from './commons/ValueSlider';

export type TSleep = TValue;

interface TProps {
  value?:TSleep;
  onChange:(value:TSleep)=>void;
}

export default function SleepSetter (props:TProps) {
  const {value,onChange} = props;
  return (
    <ValueSlider
      title="Sleep Config(进入休眠所需时间)"
      value={value}
      onChange={onChange}
      options={{
        unit:"分钟"
      }}
    />
  );
}