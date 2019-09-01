export const DOMAIN = 'http://localhost:5000';
// export const DOMAIN = 'https://seaaseclub.herokuapp.com'
export const colorPrimary = '#292f48'; 
export const colorDisabled = 'rgba(0, 0, 0, 0.6)';
export function _pick (obj, props) {
    const results = {};

    for (let i = 0; i < props.length; i++) {
        if (typeof obj[props[i]] !== 'undefined') {
            results[props[i]] = obj[props[i]]
        }
    }

    return results
}