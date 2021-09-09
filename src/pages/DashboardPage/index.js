import React, { useEffect, useState } from 'react';
import DeviceRowComponent from '../../components/DeviceRowComponent/index';
import './index.css';
const apiURL = 'http://localhost:8888/devices';

let originalDevices = [];

function Dashboard(){
  const [devices, setDevices] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  async function getDevices() {
    const response = await fetch(apiURL)
    .then((response) => {
      return response.text();
    }).then((res) => {
      originalDevices = JSON.parse(res).data;
      const activeCount = originalDevices.filter((item) => item.active).length
      const totalCount = originalDevices.length;

      setDevices(originalDevices);
      setActiveCount(activeCount);
      setInactiveCount(totalCount - activeCount);
      filterDevices();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const onSearch = (e) => {
    setSearchText(e.target.value);
  }

  const filterDevices = () => {
    if (searchText !== '') {
      const results = originalDevices.filter((device) => {
        return device.name.toLowerCase().startsWith(searchText.toLowerCase());
        // return device;
      });
      setDevices(results);
    } else {
      setDevices(originalDevices);
    }
  };

  useEffect(() => {
    getDevices();
  },[])

  useEffect(() => {
    filterDevices()
  },[searchText])

  return(
      <div>
        <div className="top-bar">
          <div className="input-text">
            <input type="text" value={searchText} onChange={onSearch} placeholder="Search Device Name" />
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
                return <DeviceRowComponent key={device.name} getDevices={getDevices} device={device} />
               })
            }
          </tbody>
          </table>
        </div>
      </div>
  ) 
}

export default Dashboard;


