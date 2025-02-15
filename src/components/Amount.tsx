import { Box, Input, Slider, Typography } from '@mui/material';
import { Limits } from '../context/LimitsContext';

interface AmountProps {
  limits: Limits;
  amount: number;
  setAmount: (value: number) => void;
  cleanErrorMessage: () => void;
}

export default function Amount(props: AmountProps) {
  const { limits, amount, setAmount, cleanErrorMessage } = props;

  const handleSliderChange = (newValue: number | number[]) => {
    cleanErrorMessage();
    setAmount(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    cleanErrorMessage();
    setAmount(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (amount < limits.min) {
      setAmount(limits.min);
    } else if (amount > limits.max) {
      setAmount(limits.max);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        width: '100%',
        gap: 2,
      }}
    >
      <Typography variant="body1">Select amount to be requested:</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Slider
          value={amount}
          min={limits.min}
          max={limits.max}
          step={50}
          defaultValue={limits.min}
          onChange={(_, value) => handleSliderChange(value)}
          aria-labelledby="input-slider"
          sx={{ flexGrow: 1 }}
        />
        <Input
          value={amount}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            'step': 50,
            'min': limits.min,
            'max': limits.max,
            'type': 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Box>
      <Typography variant="body2">
        Amount acceptable range is between {limits.min} and {limits.max}
      </Typography>
    </Box>
  );
}
