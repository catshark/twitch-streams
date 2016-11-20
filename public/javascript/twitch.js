var freecodecamp, esl, test;
var streamInfo = [];


function getTwitchStream(stream, callback) {
    /*var request = new XMLHttpRequest();
    var requestUrl = 'https://wind-bow.hyperdev.space/twitch-api/streams/' + stream +  '?callback=?';

    request.open('GET', requestUrl, true);

    request.onload = function() {
        if (request.readyState === 4) {
            if ((request.status >= 200 && request.status < 300) || request.status == 304) {
                // Success!
                var data = JSON.parse(request.responseText);
                if (data.stream) {
                    var wikiPages = data.query.pages;

                    for (var page in wikiPages) {
                        if (wikiPages.hasOwnProperty(page)) {
                            wikiInfo.push({url: wikiPages[page].fullurl, title: wikiPages[page].title, extract: wikiPages[page].extract});
                        }
                    }
                    streamInfo.push({url: data.stream.channel.url, displayName: data.stream.channel.display_name, status: data.stream.channel.status});
                    callback(streamInfo);
                }
            }
        }
    };

    request.send();*/
    var requestUrl = 'https://wind-bow.hyperdev.space/twitch-api/streams/' + stream +  '?callback=?';

    $.getJSON(requestUrl, function(data) {
        if (data.stream) {
            streamInfo.push({url: data.stream.channel.url, displayName: data.stream.channel.display_name, game: data.stream.channel.game, status: data.stream.channel.status});
            callback(streamInfo);
        }
        else {
            var elStatus = document.querySelector("." + stream + " p.status");
            elStatus.textContent = "Offline";
        }
    });
}

function displayStreamLink(data) {
    var displayName = data[0].displayName;
    var status = data[0].status;
    var game = data[0].game;
    var link = data[0].url;
    
    var elName = document.querySelector("p.display-name");
    var elStatus = document.querySelector("p.status");
    var elLink = document.querySelector(".stream-link");
    
    elName.textContent = displayName;
    elStatus.textContent = game + ':' + status;
    elLink.setAttribute('href', link)
}

getTwitchStream('esl_sc2', displayStreamLink);
getTwitchStream('freecodecamp', displayStreamLink);
getTwitchStream('test_channel', displayStreamLink);