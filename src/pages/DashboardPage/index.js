import React, { useEffect, useState } from 'react';
import DeviceRowComponent from '../../components/DeviceRowComponent/index';
import './index.css';
const apiURL = 'http://localhost:8888/devices';

function Dashboard(){
  const [devices, setDevices] = useState([]);

  async function getDevices() {
    const response = await fetch(apiURL)
    .then((response) => {
      return response.text();
    }).then((data) => {
      console.log(JSON.parse(data).data)
      setDevices((JSON.parse(data)).data);
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
        <div className="topBar">
          <input type="text" placeholder="Search" />
          <div className="deviceBar">
            <div>3123 Active Devices</div>
            <div>567 InActive Devices</div>
          </div>
        </div>

        <div className="device-table">
          <table>
            <thead className="bg-gray-50">
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
               devices.map(device => (
                <DeviceRowComponent key={device.name} device={device} />
              ))
            }
          </tbody>
          </table>
        </div>
      </div>
  ) 
}

export default Dashboard;


