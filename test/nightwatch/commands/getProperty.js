exports.command = function (element, property, callback) {
    var self = this;

    this.execute(function (element, property) {
            return document.querySelector(element)[property];
        }, [element, property],
        function (result) {
            if (typeof callback === "function") {
                callback.call(self, result);
            }
        });
    return this;
};
