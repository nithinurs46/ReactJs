import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getData } from "../../lib/api";
import LoadingSpinner from "../Layout/LoadingSpinner";
import loaderClasses from "../Layout/LoadingSpinner.module.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import TableLayout from "./TableLayout";

const url = 'https://isro.vercel.app/api/customer_satellites';
const tableData = {
  "table": {
    "header": [
      {
        id: 'id',
        align: 'center',
        disablePadding: true,
        label: 'Centre Id',
      },
      {
        id: 'country',
        align: 'center',
        disablePadding: false,
        label: 'Country',
      },
      ,
      {
        id: 'launch_date',
        align: 'center',
        disablePadding: false,
        label: 'Launch Date',
      },
      ,
      {
        id: 'mass',
        align: 'center',
        disablePadding: false,
        label: 'Mass',
      },
      ,
      {
        id: 'launcher',
        align: 'center',
        disablePadding: false,
        label: 'Launcher',
      },
    ],
    "body": [
      {
        key: 'id',
        align: 'center'
      },
      {
        key: 'country',
        align: 'center'
      },
      {
        key: 'launch_date',
        align: 'center'
      },
      {
        key: 'mass',
        align: 'center'
      },
      {
        key: 'launcher',
        align: 'center'
      }
    ],
    "label": "Customer Satellites"
  }
}
const LoadCustomerSatellites = () => {

    const { sendRequest, status, data: satellites, error } = useHttp(getData, true);
    useEffect(() => {
        sendRequest(url)
    }, [sendRequest]);

    if (status === 'pending') {
        return (
          <div className={loaderClasses.loading}>
            <LoadingSpinner />
          </div>
        );
      }
    
      if (error) {
        return <p className='centered focused'>{error}</p>;
      }
    
      if (status === 'completed' && (!satellites || satellites.length === 0)) {
        return <p>No spacecrafts found...</p>;
      }
      return(
        <div className="container" style={{ marginTop: '60px' }}>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Customer Satellites</Breadcrumb.Item>
      </Breadcrumb>
       <TableLayout rows={satellites.customer_satellites} tableData={tableData}/>
       </div>
  )
}

export default LoadCustomerSatellites;