import { 
    CircularProgress,
    CircularProgressProps,
    Grid,
    GridProps,
    styled,
    Theme
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { Legend, Line, LineChart, ReferenceLine, Tooltip, YAxis } from 'recharts';
import { getRandomColor } from '../../../helpers';
import { ISubstance } from '../../../types';
import { IDataRange } from '../../../types/Stations';

interface IProps {
    substances: ISubstance[];
    stationSubstances: { id: number }[];
    data: any;
}

const SGrid = styled(Grid)<GridProps>(({ theme }: { theme: Theme }) => ({
    marginTop: theme.spacing(5)
}))

const SCircularProgress = styled(CircularProgress)<CircularProgressProps>(({ theme }: { theme: Theme }) => ({
    margin: `${theme.spacing(6)} auto`
}))

export const Chart = ({
    substances,
    stationSubstances,
    data
}: IProps) => {
    if (!data) return <SCircularProgress color="primary"/>;

    const formatted = data.map((indication: IDataRange) => ({
        name: moment(indication.datetime).format("DD/MM/YY:HH:MM"),
        [substances.find((substance: ISubstance) => substance.id === indication.substance.id)?.name || "Неизвестно" ]: indication.value
    }));

    return (
        <SGrid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >

            <LineChart
                width={850}
                height={335}
                data={formatted}
            >
                <YAxis />
                <Tooltip itemStyle={{ color: '#414141' }}/>
                <Legend />
                {stationSubstances.map((availableSubstance: { id: number }) => {
                    const substance = substances.find((sub: ISubstance) => sub.id === availableSubstance.id);
                    const randomColor = getRandomColor();

                    return substance 
                    ? (
                        <React.Fragment key={availableSubstance.id}>
                            <Line type="monotone" dot={false} dataKey={substance.name} stroke={randomColor} />
                            <ReferenceLine y={substance.normalValues.min} strokeDasharray="3 3" stroke={randomColor} />
                            <ReferenceLine y={substance.normalValues.max} strokeDasharray="3 3" stroke={randomColor} />
                        </React.Fragment>
                    ) : null
                })}
            </LineChart>
        </SGrid>
    )
}
