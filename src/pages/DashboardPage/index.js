import React, { useEffect, useState } from 'react';
import DeviceRowComponent from '../../components/DeviceRowComponent/index';
import './index.css';
const apiURL = 'http://localhost:8888/devices';

function Dashboard(){
  const [devices, setDevices] = useState([]);
  const[activeCount, setActiveCount] = useState(0);
  const[inactiveCount, setInactiveCount] = useState(0);

  let count = 0;

  async function getDevices() {
    const response = await fetch(apiURL)
    .then((response) => {
      return response.text();
    }).then((data) => {
      const list = JSON.parse(data).data;
      list.forEach((item) => {
        if(item.active){
          count = count + 1;
        }
      });

      const total = list.length;

      setDevices(list);
      setActiveCount(count);
      setInactiveCount(total-count);

    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getDevices();
  },[])

  return(
      <div>
        <div className="top-bar">
          <div className="input-text">
            <input type="text" placeholder="Search Device Name" />
          </div>
          <div className="device-bar">
            <div className="count">Active Devices: {activeCount}</div>
            <div className="count">Inactive Devices: {inactiveCount}</div>
          </div>
        </div>

        <div className="device-table">
          <h2>Devices</h2>
          <table>
            <thead className="table-head">
              <tr>
                <th scope="col" className="table-row">
                  Name
                </th>
                <th scope="col" className="table-row">
                  Unit 
                </th>
                <th scope="col" className="table-row">
                  value
                </th>
                <th scope="col" className="table-row">
                  TimeStamp
                </th>
                <th scope="col" className="table-row">
                  <span className="sr-only">Status</span>
                </th>
              </tr>
            </thead>
          <tbody className="">
            {
               devices.map(device => {
                return <DeviceRowComponent key={device.name} device={device} />
               })
            }
          </tbody>
          </table>
        </div>
      </div>
  ) 
}

export default Dashboard;


