/**
 * displaysleep设置
 * displaysleep分钟后,屏幕进入休眠状态
 */
import ValueSlider,{TValue} from './commons/ValueSlider';

export type TDisplaysleep = TValue;

interface TProps {
  value?:TDisplaysleep;
  onChange:(value:TDisplaysleep)=>void;
}

export default function DisplaysleepSetter (props:TProps) {
  const {value,onChange} = props;
  return (
    <ValueSlider
      title="Displaysleep(屏幕休眠时间)"
      value={value}
      onChange={onChange}
      options={{
        unit:"分种",
        MAX:20
      }}
    />
  );
} 