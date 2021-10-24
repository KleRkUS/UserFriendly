import { useCallback, useState } from "react";
import { IStation } from "../../types/Stations";

export interface IUseMarkers {
    activeMarker: any;
    initMarkers(map: typeof google.maps.Map, stations: IStation[]): void;
    removeActiveMarker(): void;
    changeActiveMarker(direction: boolean): void;
}

export const useMarkers = (): IUseMarkers => {
    const [activeMarker, setActiveMarker] = useState<number | null>(null);
    const [stationsAmount, setStationsAmount] = useState<number | null>(null);

    const removeActiveMarker = useCallback(() => {
        setActiveMarker(null);
    }, [setActiveMarker]);

    const handleMarkerClick = useCallback((id: number) => () => {
        setActiveMarker(id);
    }, [setActiveMarker]);

    const changeActiveMarker = (isIncrement: boolean) => {
        const numerableInc: number = isIncrement ? 1 : -1;

        if (stationsAmount && activeMarker) {
            const oldId = activeMarker;

            if (!oldId) setActiveMarker(null);

                const newId = oldId + numerableInc;
                if (newId >= 1 && newId < stationsAmount) {
                    setActiveMarker(oldId + numerableInc);
                } else if (newId < 1) {
                    setActiveMarker(stationsAmount);
                } else {
                    setActiveMarker(1);
            }
        }
    };

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
