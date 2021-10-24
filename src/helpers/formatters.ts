import { ISubstance } from "../types";
import { IDataRange } from "../types/Stations";

export const formatSubstances = (substances: any[]) => (
    substances.map((substance: any): ISubstance => ({
        id: substance.id,
        name: substance.substance_name,
        generalValues: {
            min: substance.min_value,
            max: substance.max_value,
        },
        normalValues: {
            min: substance.normal_value_min,
            max: substance.normal_value_max
        }
    }))
);

export const formatStations = (stations: any[]) => (
    stations.map((station: any) => ({
        id: station.id,
        coords: {
            lng: station.location_y,
            lat: station.location_x
        }
    }))
);
