export const ICON_MAP = new Map();
export const FORECAST_MAP = new Map();
export const dayOrNightCodes = [0, 1, 51, 53, 56, 61, 66, 80];

addMapping([0], "", ICON_MAP); //01d
addMapping([1], "cloudy", ICON_MAP); //02d
addMapping([2], "cloud", ICON_MAP); //03d 
addMapping([3], "cloud-overcast", ICON_MAP); //04d
addMapping([45, 48], "smog", ICON_MAP); //50d
addMapping(
    [51, 53, 56, 61, 66, 80],
    "cloud-showers-light", ICON_MAP
); //10d
addMapping(
    [55, 57, 63, 65, 67, 81, 82],
    "cloud-showers-heavy", ICON_MAP
); //09d
addMapping([71, 73, 75, 77, 85, 86], "snowflake", ICON_MAP); //13d
addMapping([95, 96, 99], "cloud-bolt", ICON_MAP); //11d


addMapping([0], '', FORECAST_MAP);
addMapping([3, 51, 53, 56, 61, 66, 80, 55, 57, 63, 65, 67, 81, 82, 71, 73, 75, 77, 85, 86, 95, 96, 99], 'clouds', FORECAST_MAP);
addMapping([45, 48], 'smog', FORECAST_MAP);
addMapping([1, 2], 'cloudySky', FORECAST_MAP);

function addMapping(values, icon, map) {
    values.forEach((value) => {
        map.set(value, icon);
    });
}