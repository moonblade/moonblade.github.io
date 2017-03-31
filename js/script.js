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
System.register("main", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function doCommand() {
        // var command = $('')
    }
    var constant, Unique, Box, Character, Interactable, player;
    return {
        setters: [],
        execute: function () {
            constant = {
                defaultPlayerName: "player",
                startLocation: "startLocation"
            };
            Unique = (function () {
                function Unique() {
                }
                return Unique;
            }());
            Box = (function (_super) {
                __extends(Box, _super);
                function Box() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Box;
            }(Unique));
            Character = (function (_super) {
                __extends(Character, _super);
                function Character(name) {
                    var _this = _super.call(this) || this;
                    _this.name = name;
                    _this.inventory = [];
                    _this.location = constant.startLocation;
                    return _this;
                }
                Character.prototype.moveTo = function (location) {
                    console.log("Moving To " + location);
                    this.location = location;
                };
                return Character;
            }(Unique));
            Interactable = (function (_super) {
                __extends(Interactable, _super);
                function Interactable() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Interactable;
            }(Unique));
            player = new Character(constant.defaultPlayerName);
            console.log(player);
            console.log("here");
        }
    };
});
