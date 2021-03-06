/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// reactstrap components
import { Card, Container, Row } from "reactstrap";
import useMap from "../hooks/useMap";
import { socketUrl } from "Common/http/http";
import { io } from "socket.io-client";
import { mapOptions } from "../styles/mapStyles";

const MapWrapper = () => {
	var google = window.google;
	var map;
	const { getVotes, genMarkers, votes } = useMap();

	//init map fn
	const loadMap = () => {
		map = new google.maps.Map(
			document.getElementById("map-canvas"),
			mapOptions
		);
		genMarkers(map);
	};

	//set marker fn
	const setMarker = (marker) => {
		let stringCoordsArray = marker.location.coordinates.map((str) =>
			str.toString()
		);
		//create a new latitude and longitude object with the array above
		const newLatLang =
			stringCoordsArray?.length &&
			new google.maps.LatLng(stringCoordsArray[1], stringCoordsArray[0]);
		//create a new marker with the coordinate object above
		const newMarker = new google.maps.Marker({
			position: newLatLang,
			animation: google.maps.Animation.DROP,
		});
		//create a content string that shows up on click of the marker
		const contentString =
			'<div class="info-window-content"><h2>Azimio:  ' +
			marker.azimioLaUmoja +
			"</h2>" +
			"<h2>Kenya Kwanza: " +
			marker.kenyaKwanza +
			"</h2>" +
			"";
		const infowindow = new google.maps.InfoWindow({
			content: contentString,
		});
		//add an event listener to display the info window on click events
		google.maps.event.addListener(newMarker, "click", function () {
			infowindow.open(map, newMarker);
		});
		newMarker.setMap(map);
		return newMarker;
	};

	useEffect(() => {
		getVotes();
	}, []);
	useEffect(() => {
		loadMap();
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

	socket.on("NewVote", (newVote) => {
		setMarker(newVote);
	});

	return (
		<>
			<div
				style={{ height: `600px` }}
				className="map-canvas"
				id="map-canvas"
				// ref={mapRef}
			></div>
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
