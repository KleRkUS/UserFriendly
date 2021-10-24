import { 
    Button,
    ButtonProps,
    Grid,
    styled,
    Theme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';

interface IProps {
    handleClick(direction: boolean): () => void;
}

const SButton = styled(Button)<ButtonProps>(({ theme }: { theme: Theme }) => ({
    color: theme.palette.common.white
}))

export const StationButtons = ({ handleClick }: IProps): JSX.Element => (
    <Grid
        container
        justifyContent="space-between"
        alignItems="center"
    >
        <SButton 
            variant="text"
            startIcon={<ArrowBackIcon/>}
            onClick={handleClick(false)}
            color="primary"
        >
            Назад
        </SButton>
        <SButton
            variant="text"
            endIcon={<ArrowForwardIcon/>}
            onClick={handleClick(true)}
            color="primary"
        >
            Вперед
        </SButton>
    </Grid> 
);
