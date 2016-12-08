exports.command = function (callback) {
    var self = this;

    this.execute(function () {
            return document.querySelector('myscript-common-element')._inkPaper.getInkAsImageData();
        }, [],
        function (result) {
            if (typeof callback === "function") {
                callback.call(self, result);
            }
        });
    return this;
};
