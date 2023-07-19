export const ICON_MAP = new Map();
export const dayOrNightCodes = [0, 1, 51, 53, 56, 61, 66, 80];

addMapping([0], "sun"); //01d
addMapping([1], "cloudy"); //02d
addMapping([2], "cloud"); //03d 
addMapping([3], "cloud-overcast"); //04d
addMapping([45, 48], "smog"); //50d
addMapping(
    [51, 53, 56, 61, 66, 80],
    "cloud-showers-light"
); //10d
addMapping(
    [55, 57, 63, 65, 67, 81, 82],
    "cloud-showers-heavy"
); //09d
addMapping([71, 73, 75, 77, 85, 86], "snowflake"); //13d
addMapping([95, 96, 99], "cloud-bolt"); //11d

function addMapping(values, icon) {
    values.forEach((value) => {
        ICON_MAP.set(value, icon);
    });
}