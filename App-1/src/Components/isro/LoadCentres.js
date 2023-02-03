import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getData } from "../../lib/api";
import LoadingSpinner from "../Layout/LoadingSpinner";
import loaderClasses from "../Layout/LoadingSpinner.module.css";
import TableLayout from "./TableLayout";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


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
        id: 'name',
        align: 'center',
        disablePadding: false,
        label: 'Location',
      },
    ],
    "body": [
      {
        key: 'id',
        align: 'center'
      },
      {
        key: 'name',
        align: 'center'
      }
    ],
    "label": "ISRO Centres"
  }
}

const LoadCentres = ()=>{
    const url = 'https://isro.vercel.app/api/centres';
    const{sendRequest, status, data:centres, error} = useHttp(getData, true);
    
    useEffect(()=>{
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
    
      if (status === 'completed' && (!centres || centres.length === 0)) {
        return <p>No spacecrafts found...</p>;
      }
      return(
            <div className="container" style={{ marginTop: '60px' }}>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>ISRO Centres</Breadcrumb.Item>
          </Breadcrumb>
           <TableLayout rows={centres.centres} tableData={tableData}/>
           </div>
      )
}

export default LoadCentres;