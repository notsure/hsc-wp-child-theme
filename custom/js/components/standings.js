(function($) {
    "use strict";

    function HockeyDataWidgetsStandings() {
        var logoBaseUrl = 'http://api2.hockeydata.net/img/icehockey/ebel/team-logos/';
        var divisionId = '136';
        var teamId = '731';

        var retrieveHeaderTemplate = function() {
            return '<tr>'
                + '<th class="rank">#</th>'
                + '<th class="team" colspan="2">Team</th>'
                + '<th class="info">GP</th>'
                + '<th class="info">W</th>'
                + '<th class="info">L</th>'
                + '<th class="info">P</th>'
                + '</tr>';
        };

        var retrieveRowTemplate = function() {
            return '<tr class="hsc-standings-row">'
                + '<td class="rank">{{ tableRank }}</td>'
                + '<td class="image"><img src="' + logoBaseUrl + divisionId + '/{{ id }}.png" /></td>'
                + '<td class="team">{{ teamLongname }}</td>'
                + '<td class="info">{{ gamesPlayed }}</td>'
                + '<td class="info">{{ gamesWon }}</td>'
                + '<td class="info">{{ gamesLost }}</td>'
                + '<td class="info">{{ points }}</td>'
                + '</tr>';
        };

        var buildWidget = function($elem, data) {
            var output = '<table class="table hsc-standings">';
            var rows = buildRows(data.rows);
            output += retrieveHeaderTemplate();
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

    $(document).ready(function() {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        $('.js-widget-standings').each(function() {
            var standings = new HockeyDataWidgetsStandings;
            standings.init($(this));
        });
    });
})(jQuery);
