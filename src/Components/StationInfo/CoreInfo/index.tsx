import { 
    Box,
    Grid,
    GridProps,
    styled,
    Theme 
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { rangeType } from '..';
import { filterIndications } from '../../../helpers/formatters';
import { ISubstance } from '../../../types';
import { IDataRange } from '../../../types/Stations';
import { InfoBlock } from './InfoBlock';
import { TimeRangeSwitcher } from './TimeRangeSwitcher';

interface IProps {
    data: IDataRange[];
    currentDate: moment.Moment;
    currentTimeRange: rangeType;
    stationName: string;
    substances: ISubstance[];
    onTimeRangeChange(time: rangeType): void
}

const SImage = styled('img')<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>(({ theme }: { theme: Theme }) => ({
    width: theme.spacing(28),
    marginRight: theme.spacing(6)
}))

const SInfoGrid = styled(Grid)<GridProps>(({ theme }: { theme: Theme }) => ({
    height: '100%'
}))

export const CoreInfo = ({
    data,
    currentDate,
    currentTimeRange,
    stationName,
    substances,
    onTimeRangeChange
}: IProps): JSX.Element => {
    const [todayData, setTodayData] = useState<IDataRange[] | null>(null);

    useEffect(() => {
        const filtered = filterIndications(data, currentDate);
        setTodayData(filtered);
    }, [setTodayData, currentDate, data]);

    return (
        <Grid
            container
            justifyContent="start"
            alignContent="start"
        >
            <SImage alt="Just a beautiful tower" src="/assets/Tower.svg"/>

            <Box>
                <SInfoGrid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignContent="stretch"
                >
                    <InfoBlock
                        stationName={stationName}
                        currentDate={currentDate}
                        substances={substances}
                        data={todayData}
                    />
                    <TimeRangeSwitcher
                        currentVariant={currentTimeRange} 
                        onSwitch={onTimeRangeChange}
                    />
                </SInfoGrid>
            </Box>
        </Grid>
    )
    
}