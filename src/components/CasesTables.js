import { Divider, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { FatalCasesTable } from './FatalCasesTable';
import { RecoveredCasesTable } from './RecoveredCasesTable';

export const CasesTables = ({ country }) => {
  const fatal = React.useMemo(() => <FatalCasesTable country={country} />, [country])
  const recovered = React.useMemo(() => <RecoveredCasesTable country={country} />, [country])
  return (
    <Box style={{ padding: '12px' }}>
      <Divider />
      <Grid container spacing={6} style={{ padding: '24px 0px' }}>
        <Grid item xs={6} style={{ textAlign: 'center' }}>
          <Typography>Fatal Cases</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'center' }}>
          <Typography>Recovered Cases</Typography>
        </Grid>
        <Grid item xs={6} style={{ paddingTop: '12px' }}>
          <Paper>
            {fatal}
          </Paper>
        </Grid>
        <Grid item xs={6} style={{ paddingTop: '12px' }}>
          <Paper>
            {recovered}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}