import { 
    Grid,
    styled,
    Theme,
    Typography,
    TypographyProps
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ISubstancesSlice } from '../../../../slices/substances';
import { ISubstance } from '../../../../types';
import { IDataRange } from '../../../../types/Stations';

interface IProps {
    stationName: string;
    currentDate: moment.Moment;
    data: IDataRange[] | null;
    substances: ISubstancesSlice;
}

const SUl = styled('ul')<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>(({ theme }: { theme: Theme }) => ({
    marginTop: theme.spacing(6),
    paddingLeft: 0
}));

const SLi = styled('li')<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>(({ theme }: { theme: Theme }) => ({
    listStyleType: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
}));

const SSubstanceName = styled(Typography)<TypographyProps>(({ theme }: { theme: Theme }) => ({
    minWidth: theme.spacing(4),
    marginRight: theme.spacing(2)
}));

const STypographyDate = styled(Typography)<TypographyProps>(({ theme }: { theme: Theme }) => ({
    color: "#658DAE"
}));

export const InfoBlock = ({
    stationName,
    currentDate,
    data = [],
    substances
}: IProps): JSX.Element => (
    <Box>
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >

            <Box>
                <Typography variant="h6" color="white">
                    {stationName}
                </Typography>
            </Box>
            <Box>
                <STypographyDate variant="h6">
                    {currentDate.format("DD/MM/YYYY")}    
                </STypographyDate>  
            </Box>

            <SUl>
                {data && data.map((substanceData: IDataRange) => {
                    const substance: ISubstance | undefined = substances.find((sub: ISubstance) => sub.id === substanceData.substance.id);

                    if (substance) {
                        const value = substanceData.value;
                        const isTooHight: boolean = substance.normalValues.max < value;
                        const isTooLow: boolean = substance.normalValues.min > value;
                        const isNormal: boolean = !isTooLow && !isTooHight;

                        return (
                            <SLi key={`${substanceData.substance.id}+${value}`}>
                                <SSubstanceName 
                                    variant="body1"
                                    color={`${isNormal ? "white" : "error"}`}
                                >
                                    {substance.name}
                                </SSubstanceName>

                                <Typography 
                                    variant="body1"
                                    color={`${isNormal ? "white" : "error"}`}
                                >
                                    {isNormal && "Нормально"}
                                    {isTooLow && "Понижено"}
                                    {isTooHight && "Превышено"}
                                </Typography>
                            </SLi>
                        )
                    }

                    return <></>
                })}
            </SUl>

        </Grid>
    </Box>
);
