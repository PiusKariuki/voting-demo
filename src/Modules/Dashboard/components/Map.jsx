import React from "react";
// reactstrap components
import { Card, Container, Row } from "reactstrap";
import useMap from "../hooks/useMap";
import { baseUrl, socketUrl } from "Common/http/http";
import { io } from "socket.io-client";

const MapWrapper = () => {
	const { getVotes, votes } = useMap();
	React.useLayoutEffect(() => {
		//ajax call
		getVotes();
	}, []);
	const mapRef = React.useRef(null);

	React.useEffect(() => {
		let google = window.google;
		var map = mapRef.current;
		let lat = "0.3031";
		let lng = "36.0800";
		const myLatlng = new google.maps.LatLng(lat, lng);
		const mapOptions = {
			zoom: 4,
			center: myLatlng,
			scrollwheel: false,
			zoomControl: true,
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

		map = new google.maps.Map(map, mapOptions);

		votes?.length &&
			votes.map((vote, key) => {
				//convert coordinates array into an array of strings
				let stringCoordsArray = vote.location.coordinates.map((str) =>
					str.toString()
				);
				//create a new latitude and longitude object with the array above
				const newLatLang =
					stringCoordsArray?.length &&
					new google.maps.LatLng(stringCoordsArray[1], stringCoordsArray[0]);
				//create a new marker with the coordinate object above
				const newMarker = new google.maps.Marker({
					position: newLatLang,
					map: map,
					// animation: google.maps.Animation.DROP,
				});
				//create a content string that shows up on click of the marker
				const contentString =
					'<div class="info-window-content"><h2>Azimio:  ' +
					vote.azimioLaUmoja +
					"</h2>" +
					"<h2>Kenya Kwanza: " +
					vote.kenyaKwanza +
					"</h2>" +
					"";
				const infowindow = new google.maps.InfoWindow({
					content: contentString,
				});
				//add an event listener to display the info window on click events
				google.maps.event.addListener(newMarker, "click", function () {
					infowindow.open(map, newMarker);
				});
				return newMarker;
			});
	}, [votes]);

	/*......................................
    *sockets
 ......................................*/

	const socket = io(socketUrl, {
		transports: ["websocket"],
	});

	socket.on("connection", () => {
		console.log("socket open");
	});

	socket.on("NewVote", () => {
		getVotes();
	});

	return (
		<>
			<div
				style={{ height: `600px` }}
				className="map-canvas"
				id="map-canvas"
				ref={mapRef}></div>
		</>
	);
};

const Maps = () => {
	return (
		<>
			{/* Page content */}
			<Container className="mt-5" fluid>
				<Row>
					<div className="col">
						<Card className="shadow border-0">
							<MapWrapper />
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default Maps;
