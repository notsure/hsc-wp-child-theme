(function($) {
    "use strict";

    var HockeyDataWidgetsSchedule = function() {
        var logoBaseUrl = '/wp-content/themes/hsc-theme/images/teams';
        var divisionId = '136';
        var teamId = '731';

        var buildWidgetHeader = function() {
            return '<div class="hsc-game-schedule-list-header">'
                + '  <div class="date">Datum</div>'
                + '  <div class="time"></div>'
                + '  <div class="team">Begegnung</div>'
                + '  <div class="scores">Ergebnis</div>'
                + '</div>';
        };

        var retrieveRowTemplate = function() {
            return '<div class="hsc-game-schedule-list-item">'
                + '  <div class="schedule">'
                + '    <div class="date">{{ scheduledDate.value }}</div>'
                + '    <div class="time">- {{ scheduledTime }}</div>'
                + '  </div>'
                + '  <div class="game">'
                + '  <div class="teams">'
                + '    <div class="team team-home">'
                + '      <div class="teamlogo"><img src="' + logoBaseUrl + '/{{ homeTeamId }}.png" /></div>'
                + '      <div class="teamname">{{ homeTeamLongName }}</div>'
                + '    </div>'
                + '    <div class="team team-away">'
                + '      <div class="teamlogo"><img src="' + logoBaseUrl + '/{{ awayTeamId }}.png" /></div>'
                + '      <div class="teamname">{{ awayTeamLongName }}</div>'
                + '    </div>'
                + '  </div>'
                + '  <div class="scores">'
                + '      {{ homeTeamScore === null ? "-": homeTeamScore }}'
                + '      : {{ awayTeamScore === null ? "-": awayTeamScore }}'
                + '  </div>'
                + '  </div>'
                + '</div>';
        };

        var buildWidget = function($elem, data) {
            var output = '<div class="hsc-game-schedule-list">';
            var rows = buildRows(data.rows);
            // output += buildWidgetHeader();
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

    $(document).ready(function() {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        $('.js-widget-schedule').each(function() {
            var schedules = new HockeyDataWidgetsSchedule;
            schedules.init($(this));
        });
    });
})(jQuery);
