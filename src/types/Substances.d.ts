export interface ISubstance {
    id: number;
    name: string;
    generalValues: {
        min: number;
        max: number;
    },
    normalValues: {
        min: number;
        max: number;
    }
}