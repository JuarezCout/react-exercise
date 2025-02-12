import { Box, Input, Slider } from "@mui/material";

interface AmountProps {
    limits: any
    amount: number,
    setAmount: (value: number) => void
}

export default function Amount(props: AmountProps) {
    const {limits, amount, setAmount} = props;

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setAmount(newValue as number);
      };
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Slider
                    value={amount}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                />
            </Box>
            <Box>
            <Input
                value={amount as number}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                step: 50,
                min: limits.min,
                max: limits.max,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
            />
            </Box>
            <Box >
            Limits min is {limits.min} and max is {limits.max}
            </Box>
      </Box>
    )
}