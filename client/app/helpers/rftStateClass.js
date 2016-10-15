'use strict';

angular.module('rftApp')
    .directive('rftStateClass', function () {
        return function (scope, element) {
            var classesApplied = [];

            scope.$on('$stateChangeSuccess', function (event, state) {
                // Remove previously applied classes
                _.each(classesApplied, function(_class) {
                    element.removeClass(_class);
                });

                // Get an array of each sub-state
                var states = state.name.split('.');
                _.reduce(states, function(previousClass, childState) {
                    // Append child state to previous class
                    var childClass;
                    if (!previousClass) {
                        childClass = childState;
                    } else {
                        childClass = previousClass + '_' + childState;
                    }

                    element.addClass(childClass);

                    // Remember so we can take it off later
                    classesApplied.push(childClass);

                    return childClass;
                }, '');
            });
        }
    });
