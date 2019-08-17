const MONGODB_URL = "mongodb+srv://admin:admin@cluster0-ulns5.gcp.mongodb.net/test?retryWrites=true&w=majority";
function _pick (obj, props) {
    const results = {};

    for (let i = 0; i < props.length; i++) {
        if (typeof obj[props[i]] !== 'undefined') {
            results[props[i]] = obj[props[i]]
        }
    }

    return results
}
module.exports = {
    MONGODB_URL,
    _pick
}