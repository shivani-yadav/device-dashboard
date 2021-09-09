import React, { useEffect } from 'react';
import './index.css';

function DeviceRowComponent(props){
  const { getDevices } = props;
  const { name, unit, value, timestamp, active } = props.device;

  const formatTime = new Date(timestamp).toISOString();
  const apiURL = 'http://localhost:8888/devices';

  const toggleStatus = () => {
    const activeValue = !active;
    const response = fetch(`${apiURL}/${name}?active=${activeValue}`, {
      method: 'PATCH',
    }).then((response) => {
      if(response.status === 200){
        console.log(response);
        getDevices();
      } else {
        throw new Error;
      }
    }).catch((err) => {
      console.log(err)
    });
  }


  return(
    <tr>
      <td className="body-row">
        <span>{name}</span>
      </td>
      <td className="body-row">
        <span>{unit}</span>
      </td>
      <td className="body-row">
        <span>{value.toFixed(2)}</span>
      </td>
      <td className="body-row">
        <span>{formatTime}</span>
      </td>
      <td className="body-row status">
        
        <button onClick={toggleStatus}   style={ active ? { backgroundColor:'blue'} : {backgroundColor : 'gray'} }>
        { 
          active ? "Active" : "Inactive" 
        }
        </button>
        {/* <button>{active.toString()}</button> */}
      </td>
    </tr>
  )
}

export default DeviceRowComponent;

