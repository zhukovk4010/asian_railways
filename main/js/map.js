//Токен mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoiemh1a3ZvazQwMTAiLCJhIjoiY2wwOXVmbzF3MGdzbzNjcXV5ZnplZ3BiNyJ9.oMIeFlyoD4ylLHVwxVuUPg';

//Инициализация карты
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/zhukvok4010/cknks0z4523fm17ny7xc28ien', // style URL
    center: [90, 50], // starting position [lng, lat]
    zoom: 3,
    minZoom: 3,
    maxZoom: 6.99 // starting zoom
});


map.on('load', function () {
    map.addSource('10m-bathymetry-81bsvj', {
        type: 'vector',
        url: 'mapbox://mapbox.9tm8dx88'
    });

    map.addLayer(
        {
            'id': '10m-bathymetry-81bsvj',
            'type': 'fill',
            'source': '10m-bathymetry-81bsvj',
            'source-layer': '10m-bathymetry-81bsvj',
            'layout': {},
            'paint': {
                'fill-outline-color': 'hsla(337, 82%, 62%, 0)',
                // cubic bezier is a four point curve for smooth and precise styling
                // adjust the points to change the rate and intensity of interpolation
                'fill-color': [
                    'interpolate',
                    ['cubic-bezier', 0, 0.5, 1, 0.5],
                    ['get', 'DEPTH'],
                    200,
                    '#add8eb',
                    9000,
                    '#15659f'
                ]
            }
        },
        'land-structure-polygon'
    );
});

//Список промежутков годов
var years = [
    '1875',
    '1890',
    '1905',
    '1920',
    '1935',
    '1950',
    '1965',
    '1980',
    '1995',
    '2010'
];

function filterBy(year) {
    var filters = ['all', ['==', 'data_open', year]];
    //1875-1950
    map.setFilter('local-railways-1875-1950', filters);

    //1965-1980
    map.setFilter('local-raiways-1965-1980', filters);

    //1980-1995
    map.setFilter('local-railways-1995-2010', filters);

    //названия жд
    map.setFilter('points-other-names', filters);


    document.getElementById('year').textContent = years[year];
}

map.on('load', function () {

    filterBy(9);

    document
        .getElementById('slider')
        .addEventListener('input', function (e) {
            var year = parseInt(e.target.value, 10);
            filterBy(year);
    })
});

map.on('load', function () {
    map.addSource('main_stations', {
        type: 'vector',
        url: 'https://api.mapbox.com/tilesets/v1/sources/zhukvok4010/zhukvok4010.bdo5f9v2?access_token=pk.eyJ1Ijoiemh1a3ZvazQwMTAiLCJhIjoiY2sxczBubGVtMDcwbjNnb3o0MjVyYndjeCJ9.wO_VEutNFxbOtAo287bMWA'
    });
    map.addLayer({
        'id': 'main_stations_1920',
        'type': 'circle',
        'source': 'main_stations',
        'source-layer': 'main_stations_1920',
        'paint': {
            'circle-radius': 4,
            'circle-color': '#ff69b4'
        }
    });
});

map.addControl(new mapboxgl.NavigationControl());

let scale = new mapboxgl.ScaleControl();
map.addControl(scale)

function openModal1() {
    if(document.getElementById('modal1').style.display === 'none'){
        document.getElementById('modal1').style.display = 'block';
        document.getElementById('modal2').style.display = 'none';
    } else {
        document.getElementById('modal1').style.display = 'none';
    }

}

function openModal2() {
    if(document.getElementById('modal2').style.display === 'none'){
        document.getElementById('modal2').style.display = 'block';
        document.getElementById('modal1').style.display = 'none';
    } else {
        document.getElementById('modal2').style.display = 'none';
    }

}
