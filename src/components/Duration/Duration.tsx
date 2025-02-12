import { Grid, Input, Slider } from "@mui/material";

interface DurationProps {
    duration: number,
    setDuration: (value: number) => void
}

export default function Duration(props: DurationProps) {
    const {duration, setDuration} = props;

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setDuration(newValue as number);
      };
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid xs>
                <Slider
                    value={duration}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                />
            </Grid>
            <Grid item>
            <Input
                value={duration as number}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                step: 1,
                min: 3,
                max: 12,
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
            />
            </Grid>
            Limits min is {3} and max is {12}
      </Grid>
    )
}