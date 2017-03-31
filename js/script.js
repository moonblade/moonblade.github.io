var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var constants = {
    defaultPlayerName: "player",
    startLocation: "startLocation"
};
var Unique = (function () {
    function Unique() {
    }
    return Unique;
}());
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Box;
}(Unique));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.inventory = [];
        _this.location = constants.startLocation;
        return _this;
    }
    Character.prototype.moveTo = function (location) {
        console.log("Moving To " + location);
        this.location = location;
    };
    return Character;
}(Unique));
var Interactable = (function (_super) {
    __extends(Interactable, _super);
    function Interactable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Interactable;
}(Unique));
var player = new Character(constants.defaultPlayerName);
console.log(player);
console.log("here");
