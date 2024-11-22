$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('#query-form').submit(function(event) {
        submitRequest(event);
    });
});

$('#citySelected').change(function() {
    const locationData = $(this).val().split(',');
    const latitude = parseFloat(locationData[0]);
    const longitude = parseFloat(locationData[1]);

    if (latitude > 90 || latitude < -90 || longitude > 180 || longitude < -180) {
        setDataErrorMessages();
        return;
    }

    submitRequest(latitude, longitude);
});

let weatherTypeTranslation = {
    'pcloudy': 'partly cloudy',
    'mcloudy': 'mostly cloudy',
    'lightrain': 'light rain',
    'oshower': 'occasional shower',
    'ishower': 'isolated shower',
    'lightsnow': 'light snow',
    'rainsnow': 'freezing rain',
    'tstorm': 'thunderstorm',
    'tsrain': 'thunderstorm possible'
};

function formatDate(dateString) {
    let year = dateString.toString().substring(0, 4);
    let month = dateString.toString().substring(4, 6);
    let day = dateString.toString().substring(6, 8);
    let formattedDate = new Date(year, month - 1, day);
    return formattedDate.toISOString().substring(0, 10);
}

function formatResults(data) {
    let results = JSON.parse(data);
    let resultCount = 0;

    console.log(data);

    if (results.dataseries.length == 0) {
        setNotFoundMessages();
    } else {
        $('#get-results-heading').html('');
        $('#search-results-heading').text('7 Day Forecast');
        let htmlContent = '';

        htmlContent += '<div class="forecast-block row row-cols-7 row-cols-md-7 row-cols-lg-7 g-4">';

        results.dataseries.forEach(function(item) {
            resultCount++;
            htmlContent += '<div class="col">';
            htmlContent += '<p class="weather-date">' + formatDate(item.date) + '</p>';
            htmlContent += '<div class="weather-icon-div"><img class="weather-icon" src="images/' + item.weather + '.png" alt="' + item.weather + '"></div>';
            htmlContent += '<p class="weather-description">' + (weatherTypeTranslation[item.weather] || item.weather).toUpperCase() + '</p>';
            htmlContent += '<p class="weather-temperatures">H: ' + item.temp2m.max + ' ºC</p>';
            htmlContent += '<p class="weather-temperatures">L: ' + item.temp2m.min + ' ºC</p>';
            htmlContent += '</div>';
        });

        htmlContent += '</div>';

        if (resultCount > 0) {
            $('#results').html(htmlContent);
            $('[data-toggle="tooltip"]').tooltip({
                trigger: 'hover',
                delay: {
                    show: 1000,
                    hide: 0
                }
            });
        } else {
            setNotFoundMessages();
        }
    }
}

function submitRequest(lat, lon) {
    let request;
    if (request) request.abort();

    $('#get-results-heading').html('Getting forecast ...');
    $('#results').text('');

    request = $.ajax({
        url: 'https://www.7timer.info/bin/api.pl',
        type: 'GET',
        data: {
            lon: lon,
            lat: lat,
            product: 'civillight',
            output: 'json'
        }
    });

    request.done(function(response, textStatus, jqXHR) {
        formatResults(response);
        toolTipReset();
    });

    request.fail(function(jqXHR, textStatus, errorThrown) {
        $('#search-results-heading').text('An error occurred. Please try again.');
        $('#results').text('');
    });
}

function setDataErrorMessages() {
    $('#get-results-heading').html('Oops, the data is wrong for that city. Contact the webmaster.');
    $('#results').text('');
}

function setNotFoundMessages() {
    $('#get-results-heading').html('Oops, no forecast found, please change city.');
    $('#results').text('');
}

function toolTipReset() {
    $('.tooltip').tooltip('hide');
}
