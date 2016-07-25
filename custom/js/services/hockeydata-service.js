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
