export const options = {
	styles: [
		{
			featureType: "administrative",
			elementType: "labels.text.fill",
			stylers: [{ color: "#444444" }],
		},
		{
			featureType: "landscape",
			elementType: "all",
			stylers: [{ color: "#f2f2f2" }],
		},
		{
			featureType: "poi",
			elementType: "all",
			stylers: [{ visibility: "off" }],
		},
		{
			featureType: "road",
			elementType: "all",
			stylers: [{ saturation: -100 }, { lightness: 45 }],
		},
		{
			featureType: "road.highway",
			elementType: "all",
			stylers: [{ visibility: "simplified" }],
		},
		{
			featureType: "road.arterial",
			elementType: "labels.icon",
			stylers: [{ visibility: "off" }],
		},
		{
			featureType: "transit",
			elementType: "all",
			stylers: [{ visibility: "off" }],
		},
		{
			featureType: "water",
			elementType: "all",
			stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
		},
	],
};

const google = window.google;
const myLatlng = new google.maps.LatLng("-1.286389", "36.817223");
export const mapOptions = {
	zoom: 6.5,
	center: myLatlng,
	scrollwheel: false,
	zoomControl: true,
	styles: options,
};
