import { useState } from "react";
import { isLoggedInAtom, loggedUserAtom } from "./Header/isLoggedIn";
import timeseries from "./timeseries.json";
import DatePicker from "./DatePicker";
import { Table } from '@mantine/core';
import '@mantine/dates/styles.css';

export default function myDatetimes() {
  return (
    <div style={{display: "flex",flexDirection: "row"}}>
      <div >
      <Table style={{width: "20em"}}>
        
        <Table.Thead >
          <Table.Th>Datetime</Table.Th>
          <Table.Th >ENTSOE_DE_DAM_Price</Table.Th>
          <Table.Th >ENTSOE_GR_DAM_Price</Table.Th>
          <Table.Th>ENTSOE_FR_DAM_Price</Table.Th>
          </Table.Thead>
       {/* ? */}
       
        <Table.Tbody>
        {timeseries.map((x, key, index) => (
          // {index.forEach(index % 5 === 0 ) =>
          // }
          // console.log(("a")) &&
          
          
          <Table.Tr>
            <Table.Td >
              {x?.DateTime.substring(8,10) } 
              {x?.DateTime.substring(4,8) }
              {x?.DateTime.substring(0,4)  }
              {x?.DateTime.replace('T', ' ').substring(10,16)  }
           
              {/* {x?.DateTime.split().map((elements) => )}  */}
            </Table.Td>
            <Table.Td>
            {<textarea>{x?.ENTSOE_DE_DAM_Price}</textarea>}
              
            </Table.Td>
            <Table.Td>
               {<textarea>{x?.ENTSOE_GR_DAM_Price}</textarea>}
              
            </Table.Td>
            <Table.Td>
              
            {<textarea>{x?.ENTSOE_FR_DAM_Price}</textarea>}
            </Table.Td>
          </Table.Tr>
          
        ))}
        </Table.Tbody>
      </Table>
      </div>
      <div>
      <DatePicker />
      </div>
      
    </div>
  );
}
