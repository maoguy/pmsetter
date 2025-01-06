/**
 * 显示器睡眠时使显示器亮度改变为当前亮度的一半
 * 1是开启  0是关闭。
 * 如果关闭这个功能的话，显示器睡眠会直接关掉显示器。
 * halfdim:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type THalfdimSwitch = TValue;

interface TProps {
  value?:THalfdimSwitch;
  onChange:(value:THalfdimSwitch)=>void;
}

export default function HalfdimSetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Halfdim(显示器半亮)"
      value={value}
      onChange={onChange}
      options={{
        tips:"显示器睡眠时使显示器亮度改变为当前亮度的一半,如果关闭这个功能的话，显示器睡眠会直接关掉显示器。"
      }}
    />
  );
}