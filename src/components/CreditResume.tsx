import { Box, Typography } from '@mui/material';
import { SimulationData } from '../hooks/useCreditSimulation';

interface CreditResume {
  simulation: SimulationData;
  currency?: string;
}
export default function CreditResume({ simulation, currency }: CreditResume) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
    >
      <Typography variant="h6">Resume of the simulation</Typography>
      <Typography variant="body1">
        Amount: {simulation.amount.toFixed(2)} {currency?.toUpperCase()}
      </Typography>
      <Typography variant="body1">Duration: {simulation.duration} months</Typography>
    </Box>
  );
}
