; (function () {
    "use strict";

    var arrayHelpers = {
        "allItemsAreTheSame": function (array) {
            return !array.some(function (value, index, array) {
                return value !== array[0];
            });
        }
    }

    angular.module("connect4")
        .constant("arrayHelpers", arrayHelpers);

})();
