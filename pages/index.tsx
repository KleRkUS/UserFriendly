import type { 
    NextPage,
    GetStaticProps,
    GetStaticPathsContext
} from 'next';
import { useSnackbar } from 'notistack';
import css from '../src/styles/Home.module.css';
import { IStation, ISubstance } from '../src/types';
import { StationInfo } from '../src/Components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IUseMap, useMap } from '../src/hooks';
import { getAllDetailedStations, getDetailedSubstances } from '../src/helpers/queries';
import { Layout } from '../src/Components/Layout';
import { styled, Theme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { saveSubstances } from '../src/slices/substances';
import { formatSubstances } from '../src/helpers/formatters';

interface ILoadedData {
    success: boolean;
    error: string | null;
}

interface ILoadedStations extends ILoadedData{
    data: IStation[] | null;
}

interface ILoadedSubstances extends ILoadedData{
    data: ISubstance[] | null;
}

interface IProps {
    apiKey: string;
    loadedStations: ILoadedStations;
    loadedSubstances: ILoadedSubstances;
}

const SRoot = styled('main')<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>(({ theme }: { theme: Theme }) => ({
    overflowX: 'hidden',
    position: 'relative',
    height: `calc(100vh - ${theme.spacing(11)})`,
    width: '100%'
}));

const Home = ({ 
    apiKey,
    loadedStations,
    loadedSubstances
}: IProps): JSX.Element => {
    const [error, setError] = useState<null | string>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { 
        activeMarker,
        removeActiveMarker,
        changeActiveMarker,
        initMap
    }: IUseMap = useMap({ apiKey, ref, setError });

    const handleStationChange = useCallback((direction: boolean) => () => {
        changeActiveMarker(direction);
    }, [changeActiveMarker]);

    const effectsCallback = (props: ILoadedStations | ILoadedSubstances, successCb: () => void) => {
        if (!props.success) {
            enqueueSnackbar(`Произошла ошибка при загрузке приложения, пожалуйста, перезагрузите страницу`, { variant: 'error' });
            setError(props.error);
        } else {
            if (props.data) {
                successCb()
            }
        }
    }
    
    useEffect(() => {
        effectsCallback(loadedStations, () => {
            initMap(loadedStations.data as IStation[]);
        })
    }, [loadedStations]);

    useEffect(() => {
        effectsCallback(loadedSubstances, () => {
            dispatch(saveSubstances(loadedSubstances.data as ISubstance[]));
        })
    }, [loadedSubstances])

    if (error !== null) return (
        <main className={`${css.root} ${css.errorContainer}`}>
            <div className={css.error}>
                <h3>К сожалению, произошла ошибка при загрузке сервиса</h3>
                <p>Ошибка: {error} </p>
            </div>
        </main>
    )

    return (
        <SRoot >
            <div ref={ref} className={css.map}/>
            <StationInfo
                stationId={activeMarker}
                onClose={removeActiveMarker}
                onStationChange={handleStationChange}
            />
        </SRoot>
    )
}

Home.getLayout = function (page: JSX.Element): JSX.Element {
    return (
        <Layout>
            {page}
        </Layout>
    )
};

export default Home;

export const getStaticProps: GetStaticProps = async (context: GetStaticPathsContext) => {
    const stations = await getAllDetailedStations();
    const detailedSubstances = await getDetailedSubstances();

    return {
        props: {
            apiKey: process.env.MAPS_API_KEY || '',
            loadedStations: {
                success: stations.success,
                data: stations.data || null,
                error: stations.error || null
            },
            loadedSubstances: {
                success: detailedSubstances.success,
                data: detailedSubstances.data || null,
                error: detailedSubstances.error || null
            }
        }
    }
}
