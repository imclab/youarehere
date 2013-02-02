var _map = null;

function youarehere_map(){

	if (! _map){

		var args = {
			'scrollWheelZoom': false,
		};

		var map = L.map('map', args);

		var toner = 'http://tile.stamen.com/toner-background/{z}/{x}/{y}.jpg';

		var base = L.tileLayer(toner, {
			attribution: '',
			maxZoom: 18
		});

		base.addTo(map);
		_map = map;
	}

	return _map;
}

function youarehere_map_init(geojson){

	var map = youarehere_map();

	youarehere_map_set_viewport(geojson);
	youarehere_map_draw_features(geojson);
}

function youarehere_map_set_viewport(geojson){

	var map = youarehere_map();

	var feature = geojson['features'][0];
	var bbox = feature.bbox;

	if (! bbox){
		var geom = feature.geometry;
		var coords = geom.coordinates;
		var centroid = [ coords[1], coords[0] ];
		map.setView(centroid, 15);
	}

	else {
		var extent = [ [bbox[1], bbox[0] ], [bbox[3], bbox[2] ] ];
		map.fitBounds(extent);
	}

}

function youarehere_map_draw_features(geojson){

	var map = youarehere_map();

	var style = {
		"color": 'orange',
		"weight": 2,
		"opacity": 1,
		fillOpacity: .25,
		fillColor: 'yellow',
	};

	var onfeature = function(f, layer){
		layer.on('click', function(){ });
	};

	var shape = L.geoJson(geojson, { style: style, onEachFeature: onfeature });
	shape.addTo(map);
}
