export interface IStation {
    id: number;
    coords: {
        lat: number;
        lng: number;
    };
    name: string;
}

export interface IDataRange {
    substance: {
        id: number;
    };
    is_forecast: boolean;
    datetime: string;
    value: number;
    quality: number;
}