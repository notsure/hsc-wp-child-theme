(function($) {
    window.HockeyDataService = function() {
        "use strict";

        var config = new HockeyDataConfig();
        var baseUrl = config.hockeyDataApiUrl;
        var scheduleUrl = '/Schedule';
        var standingsUrl = '/Standings';
        var knockoutUrl = '/KnockoutStage';

        var urlParams = {
            apiKey: config.hockeyDataApiKey,
            divisionId: '136',
            league: config.league,
            sport: config.sport,
            referer: config.referer
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
