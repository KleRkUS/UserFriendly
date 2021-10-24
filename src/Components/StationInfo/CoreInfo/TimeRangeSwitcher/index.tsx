import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { rangeType } from '../..';

interface IProps {
    currentVariant: rangeType;
    onSwitch(time: rangeType): void;
}

interface ITimeSet {
    time: rangeType;
    view: string;
}

const timeSets: ITimeSet[] = [
    {
        time: 'week',
        view: 'неделя'
    },
    {
        time: 'month',
        view: 'месяц'
    },
    {
        time: 'year',
        view: 'год'
    }
]

export const TimeRangeSwitcher = ({
    currentVariant,
    onSwitch
}: IProps): JSX.Element => (
    <ButtonGroup>
        {timeSets.map((time: ITimeSet) => (
            <Button 
                color="primary"
                variant="contained"
                size="small"
                key={time.time}
                onClick={() => onSwitch(time.time)}
            >
                {time.view}
            </Button>
        ))}
    </ButtonGroup>
)
