import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useTracker } from '../hooks';
import _ from 'lodash';
import { commafy } from 'lib/util';

export const RecoveredCasesTable = ({ country }) => {
  const response = useTracker({ api: 'countries', additionalParams: country && country !== 'All Countries' ? `/${country}` : '' });
  const [formattedData, setFormattedData] = React.useState([]);

  React.useEffect(() => {
    const { data } = response;
    if (data && !_.isEqual(formattedData, data)) {
      setFormattedData(data);
    }
  }, [response]);

  return (
    <div style={{ maxHeight: '500px', overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Recovered Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(Array.isArray(formattedData) ? formattedData : [formattedData]).map(item => (
            <TableRow>
              <TableCell>{item.country}</TableCell>
              <TableCell>{commafy(item.recovered)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}