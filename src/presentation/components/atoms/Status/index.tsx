import React from 'react';
import {Danger, Good, Ok} from '../../../../assets';
import {SvgProps} from 'react-native-svg';

interface StatusProps extends SvgProps {
  type: 'danger' | 'ok' | 'good';
}

const Components = {
  danger: Danger,
  good: Good,
  ok: Ok,
};

const Status = (props: StatusProps) => {
  const {type = 'ok', ...rest} = props;

  const StatusComponents = Components[type];

  return <StatusComponents {...rest} />;
};

export default Status;
