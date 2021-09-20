const request = require('request')

const forecast =  (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=353b77b0e3449dbffade6d4eba3bb405&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {    
            callback('Unbale to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            console.log(body);
            callback(undefined, `${body.location.region}, ${body.current.weather_descriptions[0]}, It is currently ${body.current.temperature} degress. It feels like ${body.current.feelslike} degress out.`);
        }
    });
}

module.exports = forecast;