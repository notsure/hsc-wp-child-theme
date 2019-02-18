(function($) {
    "use strict";

    function HscKnockout() {
        var config = new HockeyDataConfig();
        var divisionId = '136';
        var defaultTeams = [3740, 3741, 4951, 4952];
        var type = 'halbfinale';

        var retrieveEncounterOverviewTemplate = function(data) {
            var template = '<table class="hsc-knockout-overview">'
                + '<tr>'
                + '  <td class="image">';

            if (_.contains(defaultTeams, data.teams[0].id)) {
                template += '<strong>{{ teams[0].longname }}</strong>';
            } else {
                template += '<img src="' + config.logoBaseUrl + '/{{ teams[0].id }}.png"/>';
            }

            template += '  </td>'
                + '  <td class="meta">'
                + '    <span class="score">{{ teams[0].gamesWon }} : {{ teams[1].gamesWon }}</span><br/>'
                + '    <span class="bestof">Best of: {{ bestOf }}</span>'
                + '  </td>'
                + '  <td class="image">';

            if (_.contains(defaultTeams, data.teams[1].id)) {
                template += '<strong>{{ teams[1].longname }}</strong>';
            } else {
                template += '<img src="' + config.logoBaseUrl + '/{{ teams[1].id }}.png"/>';
            }

            template += '  </td>'
                + '</tr>'
                + '</table>';
            template = _.template(template);

            return template(data);
        };

        var retrieveEncounterGameTemplate = function(game) {
            var template = '<tr>';

            if (!game.dateIsToBeDetermined) {
                template += '  <td class="date" colspan="2">'
                    + '    {{ scheduledDate.value }} - {{ scheduledTime }}'
                    + '  </td>';
            } else {
                template += '  <td class="date" colspan="2">'
                    + '    TBD'
                    + '  </td>';
            }

            template += '</tr><tr>'
                + '  <td class="team">{{ homeTeamLongName }} <br/> {{ awayTeamLongName }}</td>'
                + '  <td class="score">'
                + '      {{ gameStatus > 0 ? homeTeamScore : "-" }}'
                + '      : {{ gameStatus > 0 ? awayTeamScore : "-" }}'
                + '  </td>'
                + '</tr>';
            template = _.template(template);

            return template(game);
        };

        var buildWidget = function($elem, data) {
            var output = '<div class="hsc-knockout">';
            var phases = buildKnockoutPhases(data);
            output += phases;
            output += '</div>';

            output = $(output);
            $elem.append(output);
            output.fadeIn();
        };

        var buildKnockoutPhases = function(data) {
            if (type.toLowerCase() === 'halbfinale') {
                return retrieveKnockoutPhase(data.phases[0]);
            } else {
                return retrieveKnockoutPhase(data.phases[1]);
            }
        };

        var retrieveKnockoutPhase = function(phase) {
            var output = '';
            _.each(phase.encounters, function(encounter, key) {
                output += retrieveEncounter(encounter);
            });

            return output;
        };

        var retrieveEncounter = function(encounter) {
            var output = '';
            var overviewData = {
                teams: encounter.teams,
                bestOf: encounter.bestOf
            };

            output += '<div class="hsc-knockout-game">';
            output += retrieveEncounterOverviewTemplate(overviewData);

            output += '<table class="hsc-knockout-list">';
            output += retrieveEncounterGames(encounter.games);
            output += '</table>';
            output += '</div>';

            return output;
        };

        var retrieveEncounterGames = function(games) {
            var output = '';

            _.each(games, function(game, key) {
                output += retrieveEncounterGameTemplate(game);
            });

            return output;
        };

        return {
            init: function($elem) {
                var service = new HockeyDataService;
                divisionId = $elem.data('division');
                type = $elem.data('type');

                service.getKnockout(divisionId).then(
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

        $('.js-hsc-knockout').each(function() {
            var widget = new HscKnockout;
            widget.init($(this));
        });
    });
})(jQuery);
