(function($) {
window.HockeyDataService = function() {
    "use strict";

    var baseUrl = 'http://api.hockeydata.net/data/ebel';
    var scheduleUrl = '/Schedule';
    var standingsUrl = '/Standings';
    var knockoutUrl = '/KnockoutStage';

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
        },
        getKnockout: function(divisionId) {
            urlParams.divisionId = divisionId;
            var params = $.param(urlParams);
            var url = baseUrl + knockoutUrl + '?' + params;

            return $.ajax({
                url: url,
                dataType: "jsonp"
            });
        }
    }
};
})(jQuery);
