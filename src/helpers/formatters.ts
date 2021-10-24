import moment from "moment";
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
        },
        name: station.station_name,
        substances: station.available_substances
    }))
);

export const filterIndications = (data: IDataRange[], currentDate: moment.Moment): IDataRange[] => (
    data.filter((indication: IDataRange, index: number) => {
        if (index === 0) return false;
        
        const prevIndication = data[index - 1];
        const prevDate = moment(prevIndication.datetime);
        const nextDate = moment(indication.datetime);

        if (prevDate <= currentDate && nextDate >= currentDate) {
            return Math.abs(prevDate.diff(currentDate)) > Math.abs(nextDate.diff(currentDate))
                ? true
                : false;
        }
        return false;
    })
);