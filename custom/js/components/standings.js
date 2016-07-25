(function($) {
    "use strict";

    function HockeyDataWidgetsStandings() {
        var logoBaseUrl = '/wp-content/themes/hsc-theme/images/teams';
        var divisionId = '136';
        var teamId = '731';

        var retrieveHeaderTemplate = function() {
            return '<tr class="hsc-standings-header">'
                + '<td class="rank">#</td>'
                + '<td class="image"></td>'
                + '<td class="team">Team</td>'
                + '<td class="info td-gp">Sp</td>'
                + '<td class="info td-w">S</td>'
                + '<td class="info td-l">N</td>'
                + '<td class="info td-otw">OTS</td>'
                + '<td class="info td-otl">OTN</td>'
                + '<td class="info td-goals">Tore</td>'
                + '<td class="info td-gd">TD</td>'
                + '<td class="info td-pts">PKT</td>'
                + '</tr>';
        };

        var retrieveRowTemplate = function() {
            return '<tr class="hsc-standings-row">'
                + '<td class="rank">{{ tableRank }}</td>'
                + '<td class="image"><img src="' + logoBaseUrl + '/{{ id }}.png" /></td>'
                + '<td class="team">{{ teamLongname }}</td>'
                + '<td class="info td-gp">{{ gamesPlayed }}</td>'
                + '<td class="info td-w">{{ gamesWon }}</td>'
                + '<td class="info td-l">{{ gamesLost }}</td>'
                + '<td class="info td-otw">{{ gamesWonInOt }}</td>'
                + '<td class="info td-otl">{{ gamesLostInOt }}</td>'
                + '<td class="info td-goals">{{ goalsFor }}:{{ goalsAgainst }}</td>'
                + '<td class="info td-gd">{{ goalDifference }}</td>'
                + '<td class="info td-pts">{{ points }}</td>'
                + '</tr>';
        };

        var buildWidget = function($elem, data) {
            var output = '<table class="hsc-table hsc-standings">';
            var rows = buildRows(data.rows);
            output += retrieveHeaderTemplate();
            output += rows;
            output += '</table>';

            output = $(output);
            $elem.append(output);
            output.fadeIn();
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
