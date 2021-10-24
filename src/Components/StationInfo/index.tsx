import { 
    Box,
    BoxProps,
    CircularProgress,
    Grid,
    GridProps,
    styled,
    Theme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getDetailedStation } from '../../helpers/queries';
import { StationButtons } from './StationButtons';
import css from './StationInfo.module.css';
import { CoreInfo } from './CoreInfo';
import moment from 'moment';

interface IProps {
    stationId: number | null;
    onClose(): void;
    onStationChange(direction: boolean): () => void;
}

type rangeType = 'week' | 'month' | 'year';

const SBox = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.grey[800],
    borderLeft: `${theme.spacing(4)} solid ${theme.palette.primary.dark}`,
}));

const SClickableBox = styled(Box)<BoxProps>(({ theme }: { theme: Theme}) => ({
    position: 'absolute',
    width: theme.spacing(8),
    height: theme.spacing(38),
    right: '100%',
    top: `calc((100% / 2) - (${theme.spacing(38)} / 2))`,
    backgroundColor: theme.palette.primary.dark,
    borderTopLeftRadius: theme.spacing(2),
    borderBottomLeftRadius: theme.spacing(2),
    cursor: 'pointer'
}))

const SGrid = styled(Grid)<GridProps>(({ theme }: { theme: Theme }) => ({
    height: '100%',
    padding: `0 ${theme.spacing(10)}`
}))

export const StationInfo = ({
    stationId,
    onClose,
    onStationChange
}: IProps): JSX.Element => {
    const currentDate = moment('2021-01-01T19:00:00Z');
    const [stationInfo, setStationInfo] = useState<any>(null);
    const [rangeType, setRangeType] = useState<rangeType>('week');

    const getStationInfo = async (fromDate: moment.Moment, toDate: moment.Moment) => {
        const query = await getDetailedStation(Number(stationId) || 1);
        setStationInfo(query);
    }

    useEffect(() => {
        if (stationId !== null) {
            const fromDate = currentDate.startOf(rangeType);
            const toDate = currentDate.endOf(rangeType);
            getStationInfo(fromDate, toDate);
        }
    }, [stationId])

    return (
        <SBox className={`${css.stationInfo} ${stationId ? css.stationInfo_shown : css.stationInfo_hidden}`}>
            <SClickableBox as="span" onClick={onClose}/>
            <SGrid 
                container
                direction="column"
                alignItems="stretch"
                justifyContent={`${!stationInfo && stationId ? "center" : "flex-start"}`}    
            >
                {!stationInfo && stationId && (
                    <CircularProgress color="primary"/>
                )}

                {stationId && stationInfo && (
                    <>
                        <StationButtons handleClick={onStationChange} />
                        <CoreInfo data={stationInfo.data}/>
                    </>
                )}

            </SGrid>
        </SBox>
    )
};
