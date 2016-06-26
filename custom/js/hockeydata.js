(function($, _) {
    "use strict";

    var HockeyDataService = function() {
        var baseUrl = 'http://api.hockeydata.net/data/ebel';
        var scheduleUrl = '/Schedule';
        var standingsUrl = '/Standings';

        var urlParams = {
            apiKey: 'e52b5722cbc89c3e51ee0cd6e2485a81',
            divisionId: '136',
            league: 'ebel',
            sport: 'icehockey',
            referer: 'www.h-sc.at'
        };

        return {
            getSchedule: function(divisionId) {
                var defer = $.Deferred();

                urlParams.divisionId = divisionId;
                var params = $.param(urlParams);
                var url = baseUrl + scheduleUrl + '?' + params;

                var request = $.ajax({
                    url: url,
                    dataType: "jsonp",
                    async: false
                });
                request.success(function(response) {
                    response.data.rows.push({
                        "id": "d9e6d977-e3bd-4d81-9788-722cdb9f669b",
                        "divisionId": 136,
                        "divisionName": "VEHL 1",
                        "scheduledDate": {
                            "sortValue": 1445180400000,
                            "value": "18.10.2019",
                            "shortValue": "18.10.",
                            "longValue": "18. Oktober 2015"
                        },
                        "scheduledTime": "17:00",
                        "awayTeamId": 728,
                        "awayTeamLongName": "EHC Megafit Ice Tigers Dornbirn",
                        "awayTeamShortName": "ITD",
                        "awayTeamFlavourname": "EHC Megafit Ice Tigers Dornbirn",
                        "homeTeamId": 731,
                        "homeTeamLongName": "SC Hohenems 2",
                        "homeTeamShortName": "HO2",
                        "homeTeamFlavourname": "SC Hohenems 2",
                        "homeTeamScore": null,
                        "awayTeamScore": null
                    });

                    return defer.resolve(response);
                });
                request.error(function(response) {
                    return defer.reject({
                        data: {
                            rows: []
                        }
                    });
                });

                return defer.promise();

            },
            getStandings: function(divisionId) {
                urlParams.divisionId = divisionId;
                var params = $.param(urlParams);
                var url = baseUrl + standingsUrl + '?' + params;

                return $.ajax({
                    url: url,
                    dataType: "jsonp"
                });
            }
        }
    };

    var HockeyDataWidgetsStandings = function() {
        var logoBaseUrl = 'http://api2.hockeydata.net/img/icehockey/ebel/team-logos/';
        var divisionId = '136';
        var teamId = '731';

        var retrieveRowTemplate = function() {
            return '<tr>'
                + '<td>{{ tableRank }}</td>'
                + '<td><img src="' + logoBaseUrl + divisionId + '/{{ id }}.png" /></td>'
                + '<td>{{ teamLongname }}</td>'
                + '<td>{{ gamesPlayed }}</td>'
                + '<td>{{ gamesWon }}</td>'
                + '<td>{{ gamesLost }}</td>'
                + '<td>{{ points }}</td>'
                + '</tr>';
        };

        var buildWidget = function($elem, data) {
            var output = '<table>';
            var rows = buildRows(data.rows);
            output += rows;
            output += '</table>';

            $elem.html(output);
        };

        var buildRows = function(rows) {
            var output = '';
            var template = _.template(retrieveRowTemplate());

            _.each(rows, function(value, key) {
                output += template(value);
            });

            return output;
        };

        return {
            init: function($elem) {
                var service = new HockeyDataService;
                divisionId = $elem.data('division');

                service.getStandings(divisionId).then(
                    function(response) {
                        buildWidget($elem, response.data);
                    },
                    function(response) {
                        console.log('error', response);
                    }
                );
            }
        }
    };

    var HockeyDataWidgetsSchedule = function() {
        var logoBaseUrl = 'http://api2.hockeydata.net/img/icehockey/ebel/team-logos/';
        var divisionId = '136';
        var teamId = '731';

        var retrieveRowTemplate = function() {
            return '<div class="hsc-game-schedule-list-item">'
                + '  <div class="date">{{ scheduledDate.value }}</div>'
                + '  <div class="time">{{ scheduledTime }}</div>'
                + '  <div class="teams">'
                + '    <div class="team team-home"><img src="' + logoBaseUrl + divisionId + '/{{ id }}.png" /> {{ homeTeamLongName }}</div>'
                + '    <div class="team team-away"><img src="' + logoBaseUrl + divisionId + '/{{ id }}.png" /> {{ awayTeamLongName }}</div>'
                + '  </div>'
                + '  <div class="scores">'
                + '    <div class="score score-home">{{ homeTeamScore }}</div>'
                + '    <div class="divider">:</div>'
                + '    <div class="score score-away">{{ awayTeamScore }}</div>'
                + '  </div>'
                + '</div>';
        };

        var buildWidget = function($elem, data) {
            var output = '<div class="hsc-game-schedule-list">';
            var rows = buildRows(data.rows);
            output += rows;
            output += '</div>';

            $elem.html(output);
        };

        var buildRows = function(rows) {
            var output = '';
            var template = _.template(retrieveRowTemplate());

            _.each(rows, function(value, key) {
                if (value.homeTeamId === teamId || value.awayTeamId === teamId) {
                    output += template(value);
                }
            });

            return output;
        };

        return {
            init: function($elem) {
                var service = new HockeyDataService;
                divisionId = $elem.data('division');
                teamId = $elem.data('team');

                service.getSchedule(divisionId).then(
                    function(response) {
                        buildWidget($elem, response.data);
                    },
                    function(response) {
                        console.log('error', response);
                    }
                );
            }
        }
    };

    var HockeyDataWidgetsScheduleSingle = function() {
        var logoBaseUrl = 'http://api2.hockeydata.net/img/icehockey/ebel/team-logos/';
        var divisionId = '136';
        var teamId = '731';
        var type = 'last';

        var retrieveRowTemplate = function() {
            var className = 'last-game-widget';

            if (type === 'next') {
                className = 'next-game-widget';
            }

            return '<div class="hsc-game-schedule-widget ' + className + '">'
                + '<div class="schedule-widget-holder">'
                + '  <div class="image image-home-team">'
                + '    <img src="' + logoBaseUrl + divisionId + '/{{ homeTeamId }}.png" />'
                + '  </div>'
                + '  <div class="meta">'
                + '    <div class="date">{{ scheduledDate.value }}</div>'
                + '    <div class="time">{{ scheduledTime }}</div>'
                + '    <div class="scores">'
                + '      <div class="score score-home-team">{{ homeTeamScore }}</div>'
                + '      <div class="divider">:</div>'
                + '      <div class="score score-away-team">{{ awayTeamScore }}</div>'
                + '    </div>'
                + '  </div>'
                + '  <div class="image image-away-team">'
                + '    <img src="' + logoBaseUrl + divisionId + '/{{ awayTeamId }}.png" />'
                + '  </div>'
                + '</div>'
                + '  <div class="teams">'
                + '    <span class="team home-team">{{ homeTeamLongName }}</span>'
                + '    <span class="divider">Vs</span>'
                + '    <span class="team away-team">{{ awayTeamLongName }}</span>'
                + '  </div>'
                + '</div>';
        };

        var buildWidget = function($elem, data) {
            var output = '<div>';
            var rows = buildRows(data.rows);
            output += rows;
            output += '</div>';

            $elem.html(output);
        };

        var buildRows = function(rows) {
            var output = '';
            var template = _.template(retrieveRowTemplate());
            var today = moment();
            var limit = 1;
            var found = 0;

            if (type === 'last') {
                rows = _.chain(rows).reverse()._wrapped;
                var lastGame = _.find(rows, function(row) {
                    if ((row.homeTeamId === teamId || row.awayTeamId === teamId)
                        && (row.scheduledDate && row.scheduledDate.value)
                        && row.homeTeamScore !== null
                        && row.awayTeamScore !== null
                       ) {
                        var gameDate = moment(row.scheduledDate.value, 'DD.MM.YYYY');
                        if (gameDate.isBefore(today)) {
                            return row;
                        }
                    }
                });

                if (lastGame) {
                    output += template(lastGame);
                }
            }

            if (type === 'next') {
                var nextGame = _.find(rows, function(row) {
                    if ((row.homeTeamId === teamId || row.awayTeamId === teamId)
                        && (row.scheduledDate && row.scheduledDate.value)
                        && row.homeTeamScore === null
                        && row.awayTeamScore === null
                       ) {
                        var gameDate = moment(row.scheduledDate.value, 'DD.MM.YYYY');
                        if (gameDate.isSameOrAfter(today)) {
                            return row;
                        }
                    }
                });

                if (nextGame) {
                    output += template(nextGame);
                }
            }

            return output;
        };

        return {
            init: function($elem) {
                var service = new HockeyDataService;
                divisionId = $elem.data('division');
                teamId = $elem.data('team');
                type = $elem.data('type');

                var data = service.getSchedule(divisionId).then(
                    function(response) {
                        buildWidget($elem, response.data);
                    },
                    function(response) {
                        console.log('error', response);
                        // buildWidget($elem, JSON.parse(response.data));
                    }
                );
            }
        }
    };

    $(document).ready(function() {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        $('.js-widget-standings').each(function() {
            var standings = new HockeyDataWidgetsStandings;
            standings.init($(this));
        });

        $('.js-widget-schedule').each(function() {
            var schedules = new HockeyDataWidgetsSchedule;
            schedules.init($(this));
        });

        $('.js-widget-schedule-single').each(function() {
            var schedulesSingle = new HockeyDataWidgetsScheduleSingle;
            schedulesSingle.init($(this));
        });
    });
})(jQuery, _);
