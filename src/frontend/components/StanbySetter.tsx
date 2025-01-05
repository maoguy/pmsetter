/**
 * stanby:0关闭1开启
 */
import ValueSwitcher,{TValue} from './commons/ValueSwitcher';

export type TStanbySwitch = TValue;

interface TProps {
  value?:TStanbySwitch;
  onChange:(value:TStanbySwitch)=>void;
}

export default function StanbySetter (props:TProps) {
  const {value,onChange} = props;

  return (
    <ValueSwitcher
      title="Stanby(待机)"
      value={value}
      onChange={onChange}
      options={{
        tips:"是否启用stanby模式"
      }}
    />
  );
}