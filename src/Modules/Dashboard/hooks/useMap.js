import { Axios } from "Common/http/http";
import { useState } from "react";
import Swal from "sweetalert2";




const useMap = () => {
	let google = window.google;
	const [votes, setVotes] = useState([]);
	const getVotes = async () => {
		try {
			let { data } = await Axios.get("/polls/votes");
			setVotes(data);
		} catch (error) {
			Swal.fire({
				icon: "error",
				text: error.response.data,
			});
		}
	};

	const genMarkers = (docId) => {
		votes?.length &&
			votes.forEach((vote) => {
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
					map: docId,
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
					infowindow.open(docId, newMarker);
				});
			});
	};


	return { getVotes, genMarkers, votes };
};

export default useMap;
