import { Box, Input, Slider, Typography } from '@mui/material';
import { DURATION_RANGE } from '../utils/constants';

interface DurationProps {
  duration: number;
  setDuration: (value: number) => void;
  cleanErrorMessage: () => void;
}

export default function Duration(props: DurationProps) {
  const { duration, setDuration, cleanErrorMessage } = props;

  const handleSliderChange = (newValue: number | number[]) => {
    cleanErrorMessage();
    setDuration(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    cleanErrorMessage();
    setDuration(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (duration < 3) {
      setDuration(3);
    } else if (duration > 12) {
      setDuration(12);
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
      <Typography variant="body1">Select duration of the credit request:</Typography>
      <Box width="100%" gap={4} display="flex" flexDirection="row">
        <Slider
          value={duration}
          min={DURATION_RANGE.min}
          max={DURATION_RANGE.max}
          onChange={(_, value) => handleSliderChange(value)}
          aria-labelledby="input-slider"
        />
        <Input
          value={duration as number}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            'step': 50,
            'min': DURATION_RANGE.min,
            'max': DURATION_RANGE.max,
            'type': 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Box>
      <Typography variant="body2">
        Duration acceptable range is between {DURATION_RANGE.min} and {DURATION_RANGE.max}
      </Typography>
    </Box>
  );
}
