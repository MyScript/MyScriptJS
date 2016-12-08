exports.command = function (element, property, value, callback) {
    var self = this;

    this.execute(function (element, property, value) {
            return document.querySelector(element)[property] = value;
        }, [element, property, value],
        function (result) {
            if (typeof callback === "function") {
                callback.call(self, result);
            }
        });
    return this;
};
