(function($) {
    "use strict";
    var HockeyDataWidgetsScheduleSingle = function() {
        var logoBaseUrl = '/wp-content/themes/hsc-theme/images/teams';
        var divisionId = '136';
        var teamId = '731';
        var type = 'last';

        var retrieveEmptyTemplate = function() {
            return '<div class="no-games">'
                + 'Keine Spiele zur Zeit.'
                + '</div>';
        };

        var retrieveRowTemplate = function() {
            var className = 'last-game-widget';

            if (type === 'next') {
                className = 'next-game-widget';
            }

            return '<div class="hsc-game-schedule-widget ' + className + '">'
                + '<div class="schedule-widget-holder">'
                + '  <div class="image image-home-team">'
                + '    <img src="' + logoBaseUrl + '/{{ homeTeamId }}.png" />'
                + '  </div>'
                + '  <div class="meta">'
                + '    <div class="date">{{ scheduledDate.value }}</div>'
                + '    <div class="time">{{ scheduledTime }}</div>'
                + '    <div class="scores">{{ homeTeamScore }}:{{ awayTeamScore }}</div>'
                + '  </div>'
                + '  <div class="image image-away-team">'
                + '    <img src="' + logoBaseUrl + '/{{ awayTeamId }}.png" />'
                + '  </div>'
                + '</div>'
                + '  <div class="teams">'
                + '    <span class="team home-team">{{ homeTeamLongName }}</span>'
                + '    <span class="divider">-</span>'
                + '    <span class="team away-team">{{ awayTeamLongName }}</span>'
                + '  </div>'
                + '</div>';
        };

        var buildWidget = function($elem, data) {
            var holder = $('<div class="js-schedule-widget"></div>');
            $elem.append(holder);
            buildRows(data.rows, holder);
        };

        var buildRows = function(rows, element) {
            var output = '';
            var template = _.template(retrieveRowTemplate());
            var today = moment();
            var limit = 1;
            var found = false;

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
                    found = true;
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
                    found = true;
                    output += template(nextGame);
                }
            }

            if (found) {
                output = $(output);
                element.append(output);
                output.hide().delay('slow').fadeIn();

                return true;
            }

            template = $(retrieveEmptyTemplate());
            element.append(template);
            template.hide().delay('slow').fadeIn();

            return true;
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

        $('.js-widget-schedule-single').each(function() {
            var schedulesSingle = new HockeyDataWidgetsScheduleSingle;
            schedulesSingle.init($(this));
        });
    });
})(jQuery);
