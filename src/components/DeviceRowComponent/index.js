import React from 'react';
import './index.css';

function DeviceRowComponent(props){
  const {name, unit, value, timestamp, active} = props.device;
  return(
    <tr>
      <td className="body-row">
        {name}
      </td>
      <td className="body-row">
        {unit}
      </td>
      <td className="body-row">
        {value}
      </td>
      <td className="body-row">
        {timestamp}
      </td>
      <td className="body-row">
        {active}
      </td>
    </tr>
  )
}

export default DeviceRowComponent;

