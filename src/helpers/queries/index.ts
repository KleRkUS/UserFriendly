import { QueriesUrls } from "../../types";
import { formatStations, formatSubstances } from "../formatters";

interface IGetDataParams {
    path: string;
    params: RequestInit;
}

export interface IGetDataReturn {
    success: boolean;
    error?: string;
    data?: any;
}

export const getData = async ({
    path,
    params
}: IGetDataParams): Promise<IGetDataReturn> => {
    const baseUrl = process.env.BASE_URL;

    if (!baseUrl) return { 
        error: "Internal server error", 
        success: false 
    };

    return await fetch(`${baseUrl}/${path}`, params)
    .then(async (result: any) => ({
        success: true,
        data: await result.json()
    }))
    .catch((error: any) => ({
        error,
        success: false
    }))
}

export const getAllDetailedStations = async () => {
    const data = await getData({
        path: QueriesUrls.GetStationsDetailed,
        params: { method: 'GET' }
    })

    if (data.success) { 
        const formatted = formatStations(data.data);
        return {
            ...data,
            data: formatted
        }
    }

    return data;
};

export const getDetailedSubstances = async () => {
    const data = await getData({
        path: QueriesUrls.GetDetailedSubstances,
        params: { method: 'GET' }
    })

    if (data.success) {
        const formatted = formatSubstances(data.data)

        return {
            ...data,
            data: formatted
        }
    }

    return data;
}

export const getDetailedStation = async (id: number, fromDate?: moment.Moment, toDate?: moment.Moment) => {
    const url = QueriesUrls.GetSingleStationDetails.replace("ID", String(id));
    const searchParams: any = {};
    if (fromDate) searchParams['start_time'] = fromDate.format("YYYY-MM-DD[T]HH:mm:ss[Z]");
    if (toDate) searchParams['end_time'] = toDate.format("YYYY-MM-DD[T]HH:mm:ss[Z]");

    const fullUrl = `${url}?` + new URLSearchParams(searchParams);
    
    const data = await getData({
        path: fullUrl,
        params: { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    });

    return data;
}
