/**
 * disksleep设置
 * disksleep分钟后,屏幕进入休眠状态
 */
import ValueSlider,{TValue} from './commons/ValueSlider';

export type TDisksleep = TValue;

interface TProps {
  value?:TDisksleep;
  onChange:(value:TDisksleep)=>void;
}

export default function DisksleepSetter (props:TProps) {
  const {value,onChange} = props;
  return (
    <ValueSlider
      title="Disksleep(磁盘休眠时间)"
      value={value}
      onChange={onChange}
      options={{
        unit:"分种",
        MAX:20
      }}
    />
  );
} 