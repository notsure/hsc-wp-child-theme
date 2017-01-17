(function($) {
    "use strict";

    var HockeyDataWidgetsSchedule = function() {
        var config = new HockeyDataConfig();
        var divisionId = '136';
        var teamId = '731';

        var retrieveEmptyTemplate = function() {
            return '<div class="no-games">'
                + 'Keine Spiele zur Zeit.'
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
                + '      <div class="teamlogo"><img src="' + config.logoBaseUrl + '/{{ homeTeamId }}.png" /></div>'
                + '      <div class="teamname">{{ homeTeamLongName }}</div>'
                + '    </div>'
                + '    <div class="divider"></div>'
                + '    <div class="team team-away">'
                + '      <div class="teamlogo"><img src="' + config.logoBaseUrl + '/{{ awayTeamId }}.png" /></div>'
                + '      <div class="teamname">{{ awayTeamLongName }}</div>'
                + '    </div>'
                + '  </div>'
                + '  <div class="scores">'
                + '      {{ gameStatus > 0 ? homeTeamScore : "-" }}'
                + '      : {{ gameStatus > 0 ? awayTeamScore : "-" }}'
                + '  </div>'
                + '  </div>'
                + '</div>';
        };

        var buildWidget = function($elem, data) {
            var listHolder = $('<div class="hsc-game-schedule-list"></div>');
            $elem.append(listHolder);
            buildRows(data.rows, listHolder);
        };

        var buildRows = function(rows, element) {
            var template = _.template(retrieveRowTemplate());
            var output = '';
            var row = '';
            var delay = 1;

            if (rows.length === 0) {
                template = $(retrieveEmptyTemplate());
                element.append(template);
                template.hide().delay(delay * key).fadeIn();

                return true;
            }

            _.each(rows, function(value, key) {
                if (value.homeTeamId === teamId || value.awayTeamId === teamId) {
                    if (value.scheduledTime === '00:00') {
                        value.scheduledTime = 'k.A.';
                    }

                    row = $(template(value));
                    element.append(row);
                    row.hide().delay(delay * key).fadeIn();
                }
            });

            return true;
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
