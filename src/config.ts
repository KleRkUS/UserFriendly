enum CityCoordinates {
    Latitude = 55.7522200,
    Longitude = 37.6155600
};

const mapZoom = 11;

export const mapSettings = {
    center: {
        lat: CityCoordinates.Latitude,
        lng: CityCoordinates.Longitude
    },
    zoom: mapZoom
}