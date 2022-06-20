function getTrack() {
	var search = document.getElementById("searchBox").value;
	if (search != null){
		goResult()	

		var MusicMatchRequest = new XMLHttpRequest();		
    	MusicMatchRequest.open("GET", "http://api.musixmatch.com/ws/1.1/track.search?apikey=4d0eb8f566fd333097753e286a0bd62f&page=1&page_size=1&s_track_rating=desc&s_artist_rating=desc&q_track_artist="+search, false)
		MusicMatchRequest.send();
		if (MusicMatchRequest.status == 200) {
        	const result = JSON.parse(MusicMatchRequest.responseText);

        	var LastFMCover = new XMLHttpRequest();
        	var coverSearch =  result.message.body.track_list[0].track.album_name

        	if (coverSearch.indexOf(" (") != -1) {
        		var index = coverSearch.indexOf(" (")
        		coverSearch = coverSearch.slice(0, index) 
        	}

        	LastFMCover.open("GET", "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=891eb812dff8c61e75185ea9659af611&artist="+ result.message.body.track_list[0].track.artist_name +"&album=" + coverSearch+ "&format=json", false)
        	LastFMCover.send();
			const cover = JSON.parse(LastFMCover.responseText);

    		try {
     			document.getElementById("titleText").innerHTML = result.message.body.track_list[0].track.track_name;
        		document.getElementById("artistAlbumText").innerHTML = result.message.body.track_list[0].track.artist_name + " - " + result.message.body.track_list[0].track.album_name;
        	} catch {
				document.getElementById("titleText").innerHTML = result.message.body.track_list[0].track.track_name;
        		document.getElementById("artistText").innerHTML = result.message.body.track_list[0].track.artist_name;
        		document.getElementById("albumText").innerHTML = coverSearch//result.message.body.track_list[0].track.album_name;
        	}

        	if (LastFMCover.cover.album.image[3]['#text'] == null) {
        		document.getElementById("albumImageBack").src = "notFound.png"
        		document.getElementById("albumImage").src = "notFound.png"
        	} else {
        		var coverartURL = cover.album.image[3]['#text']
        		document.getElementById("albumImageBack").src = coverartURL.replace('300x300', '1200x1200')
        		document.getElementById("albumImage").src = coverartURL.replace('300x300', '1200x1200')
        	}
        	
			try {
        		document.getElementById("genreText").innerHTML = result.message.body.track_list[0].track.primary_genres.music_genre_list[1].music_genre.music_genre_name;
      		} catch {
      			document.getElementById("genreText").innerHTML = "Genre non disponible"
        	}				
   		}
	}		
}

function goSearch() {
	fadeIn(document.getElementById("search"))
	fadeOut(document.getElementById("result"))
}

function goResult(){
	console.log("Search")
	//document.getElementById("search").animate(
	//	[
	//		{display: 'none'},
	//		{opacity: '0'}						
	//	],{
	//	 	fill:'forwards',
    //		duration: 250,
 	//	 })
 	//document.getElementById("result").style.opacity = '1';
 	fadeOut(document.getElementById("search"))
	fadeIn(document.getElementById("result"))
}

function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 5);
}

function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 2);
}

function googleSearch(){
	var search = document.getElementById("searchBox").value;
	window.open("https://google.com/search?q=" + search, '_blank').focus();
}