
import { Loader } from "@googlemaps/js-api-loader"
import { useSnackbar } from "notistack";
import { MutableRefObject, useCallback, useState } from "react";
import { mapSettings } from "../../config";
import { IStation } from "../../types";
import { IUseMarkers, useMarkers } from "../useMarkers";

const mapInitSettings = {
    center: mapSettings.center,
    zoom: mapSettings.zoom,
    minZoom: mapSettings.zoom,
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    mapId: process.env.MAP_STYLE_ID
}

interface IUseMapParams {
    apiKey: string;
    ref: MutableRefObject<HTMLDivElement | null>;
    setError(error: string): void;
}

export interface IUseMap{
    activeMarker: number | null;
    removeActiveMarker(): void;
    changeActiveMarker(direction: boolean): void;
    initMap(stations: IStation[]): void;
}

export const useMap = ({
    apiKey,
    ref,
    setError
}: IUseMapParams): IUseMap => {
    const { enqueueSnackbar } = useSnackbar();
    const { 
        activeMarker, 
        initMarkers, 
        removeActiveMarker, 
        changeActiveMarker 
    }: IUseMarkers = useMarkers();
    
    const initMap = useCallback((stations: IStation[]) => {
        const loader = new Loader({
            apiKey,
            version: 'weekly',
            libraries: []
        });

        loader.load().then(() => {
            const map = new google.maps.Map(ref.current as HTMLElement, mapInitSettings);
            initMarkers(map, stations || []);
        }).catch((err: any) => {
            enqueueSnackbar(`Ошибка при загрузке карты: ${err}`, { variant: 'error' });
            setError(err);
        })
    }, [initMarkers, enqueueSnackbar, setError])

    return {
        activeMarker,
        removeActiveMarker,
        changeActiveMarker,
        initMap
    }
}