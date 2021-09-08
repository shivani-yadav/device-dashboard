import React from 'react';
import './index.css';

function DeviceRowComponent(props){
  const {name, unit, value, timestamp, active} = props.device;
  const formatTime = new Date(timestamp).toISOString();
  return(
    <tr>
      <td className="body-row">
        {name}
      </td>
      <td className="body-row">
        {unit}
      </td>
      <td className="body-row">
        {value.toFixed(2)}
      </td>
      <td className="body-row">
        {formatTime}
      </td>
      <td className="body-row">
        {active.toString()}
      </td>
    </tr>
  )
}

export default DeviceRowComponent;

