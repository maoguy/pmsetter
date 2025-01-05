/**
 * autopoweroffdelay设置
 * sleep autopoweroffdelay秒后,进入poweroff状态
 */
import ValueSlider,{TValue} from './commons/ValueSlider';

export type TAutopoweroffdelay = TValue;

interface TProps {
  value?:TAutopoweroffdelay;
  onChange:(value:TAutopoweroffdelay)=>void;
}

export default function AutopoweroffdelaySetter (props:TProps) {
  const {value,onChange} = props;
  return (
    <ValueSlider
      title="Autopoweroffdelay(自动断电时间)"
      value={value}
      onChange={onChange}
      options={{
        unit:"秒种",
        MAX:259200
      }}
    />
  );
}