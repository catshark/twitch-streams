var streamInfo = [];

getTwitchStream('ESL_SC2', 'all', displaySC2Stream);
getTwitchStream('freecodecamp', 'all', displayFCCStream);
getTwitchStream('test_channel', 'all', displayTestStream);

function getTwitchStream(stream, status, callback) {
    var requestUrl = 'https://wind-bow.gomix.me/twitch-api/streams/' + stream +  '?callback=?';

    $.getJSON(requestUrl, function(data) {
        if (data.stream && (status === 'all' || status === 'online') ) {
            streamInfo.push({url: data.stream.channel.url, displayName: data.stream.channel.display_name, game: data.stream.channel.game, status: data.stream.channel.status});
            callback(stream, streamInfo);
        }
        else if (!data.stream && (status === 'all' || status === 'offline')) {
            callback(stream);
        }
    });
}

function displayOnlineOrOfflineStatus(stream, data) {
    var elStreamRow = document.querySelector("." + stream);
    var elStatus = document.querySelector("." + stream + " p.status");

    if (data) {
        // add class denoting online status
        if (elStreamRow.classList) {
            elStreamRow.classList.add('online');
        } else {
            elStreamRow.className += ' ' + 'online';
        }

        var status = data[0].status;
        var game = data[0].game;
        elStatus.textContent = game + ':' + status;
    } else {
        elStatus.textContent = "Offline";

        // add class denoting offline status
        if (elStreamRow.classList) {
            elStreamRow.classList.add('offline');
        } else {
            elStreamRow.className += ' ' + 'offline';
        }
    }
}

function displayFCCStream(stream, data) {
    var twitchHeader = document.querySelector(".container .row.twitch-streamers");

    var streamTemplate = document.getElementById("displayFCCStream-template").innerHTML;
    var compiled = Handlebars.compile(streamTemplate);

    twitchHeader.insertAdjacentHTML('afterend', compiled());
    
    displayOnlineOrOfflineStatus(stream, data);
}

function displaySC2Stream(stream, data) {
    var twitchHeader = document.querySelector(".container .row.twitch-streamers");

    var streamTemplate = document.getElementById("displaySCStream-template").innerHTML;
    var compiled = Handlebars.compile(streamTemplate);

    twitchHeader.insertAdjacentHTML('afterend', compiled());

    displayOnlineOrOfflineStatus(stream, data);
}

function displayTestStream(stream, data) {
    var twitchHeader = document.querySelector(".container .row.twitch-streamers");

    var streamTemplate = document.getElementById("displayTestStream-template").innerHTML;
    var compiled = Handlebars.compile(streamTemplate);

    twitchHeader.insertAdjacentHTML('afterend', compiled());

    var elStreamRow = document.querySelector("." + stream);
    var elStatus = document.querySelector("." + stream + " p.status");

    displayOnlineOrOfflineStatus(stream, data);
}

var onlineRadioBtn = document.querySelector(".radio-streams .online");
onlineRadioBtn.onclick = function () {
    // remove offline streams
    var offlineStreams = document.querySelectorAll('.row.offline');
    Array.prototype.forEach.call(offlineStreams, function(el, i) {
        el.parentNode.removeChild(el);
    });

    // if online stream doesn't exist, display it
    var onlineStream = document.querySelector('.row.online');
    console.log("type of onlineStream is " + typeof(onlineStream));
    if (onlineStream == null) {
        getTwitchStream('ESL_SC2', 'online', displaySC2Stream);
        getTwitchStream('freecodecamp', 'online', displayFCCStream);
        getTwitchStream('test_channel', 'online', displayTestStream);
    }
};

var offlineRadioBtn = document.querySelector(".radio-streams .offline");
offlineRadioBtn.onclick = function () {
    // remove online streams
    var onlineStreams = document.querySelectorAll('.row.online');
    Array.prototype.forEach.call(onlineStreams, function(el, i) {
        el.parentNode.removeChild(el);
    });

    // if offline streams don't exist, display them
    var offlineStream = document.querySelector('.row.offline');
    console.log("type of offlineStream is " + typeof(offlineStream));
    if (offlineStream == null) {
        getTwitchStream('ESL_SC2', 'offline', displaySC2Stream);
        getTwitchStream('freecodecamp', 'offline', displayFCCStream);
        getTwitchStream('test_channel', 'offline', displayTestStream);
    }
};

var allRadioBtn = document.querySelector(".radio-streams .all");
allRadioBtn.onclick = function () {
    // remove online streams
    var onlineStreams = document.querySelectorAll('.row.online');
    Array.prototype.forEach.call(onlineStreams, function(el, i) {
        el.parentNode.removeChild(el);
    });

    // remove offline streams
    var offlineStreams = document.querySelectorAll('.row.offline');
    Array.prototype.forEach.call(offlineStreams, function(el, i) {
        el.parentNode.removeChild(el);
    });

    getTwitchStream('ESL_SC2', 'all', displaySC2Stream);
    getTwitchStream('freecodecamp', 'all', displayFCCStream);
    getTwitchStream('test_channel', 'all', displayTestStream);
};