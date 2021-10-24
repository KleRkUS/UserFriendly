import { useCallback, useState } from "react";
import { IStation } from "../../types/Stations";

export interface IUseMarkers {
    activeMarker: any;
    initMarkers(map: typeof google.maps.Map, stations: IStation[]): void;
    removeActiveMarker(): void;
    changeActiveMarker(direction: boolean): void;
}

export const useMarkers = (): IUseMarkers => {
    const [activeMarker, setActiveMarker] = useState<number | null>(1);
    const [stationsAmount, setStationsAmount] = useState<number | null>(null);

    const removeActiveMarker = useCallback(() => {
        setActiveMarker(null);
    }, [setActiveMarker]);

    const handleMarkerClick = useCallback((id: number) => () => {
        setActiveMarker(id);
    }, [setActiveMarker]);

    const changeActiveMarker = useCallback((isIncrement: boolean) => {
        const numerableInc: number = isIncrement ? 1 : -1;

        if (stationsAmount && activeMarker) {
            setActiveMarker((oldId: number | null) => {
                if (!oldId) return null;

                const newId = oldId + numerableInc;
                if (newId >= 0 && newId < stationsAmount) {
                    return oldId + numerableInc;
                } else if (newId < 0) {
                    return stationsAmount - 1;
                } else {
                    return 0;
                }
            });
        }
    }, [setActiveMarker])

    const initMarkers = useCallback((map: typeof google.maps.Map, stations: IStation[]) => {
        if (stations) {
            stations.forEach((station: IStation) => {
                const marker = new google.maps.Marker({
                    position: station.coords,
                    map,
                    title: station.name
                });

                marker.addListener('click', handleMarkerClick(station.id));
            })
            setStationsAmount(stations.length);
        }
    }, [handleMarkerClick]);

    return { 
        activeMarker, 
        initMarkers,
        removeActiveMarker,
        changeActiveMarker
    }
}
