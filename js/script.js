var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
System.register("helpers/Constants", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Constants;
    return {
        setters: [],
        execute: function () {
            Constants = (function () {
                function Constants() {
                }
                return Constants;
            }());
            Constants.startLocation = "startLocation";
            exports_1("Constants", Constants);
            window["Constants"] = Constants;
        }
    };
});
System.register("main", ["helpers/Constants"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Constants_1;
    return {
        setters: [
            function (Constants_1_1) {
                Constants_1 = Constants_1_1;
            }
        ],
        execute: function () {
            console.log("constants");
            console.log(Constants_1.default);
        }
    };
});
System.register("models/Unique", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Unique;
    return {
        setters: [],
        execute: function () {
            Unique = (function () {
                function Unique() {
                }
                return Unique;
            }());
            exports_3("Unique", Unique);
        }
    };
});
System.register("models/Box", ["models/Unique"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Unique_1, Box;
    return {
        setters: [
            function (Unique_1_1) {
                Unique_1 = Unique_1_1;
            }
        ],
        execute: function () {
            Box = (function (_super) {
                __extends(Box, _super);
                function Box() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Box;
            }(Unique_1.Unique));
        }
    };
});
System.register("models/Character", ["models/Unique"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Unique_2, Character;
    return {
        setters: [
            function (Unique_2_1) {
                Unique_2 = Unique_2_1;
            }
        ],
        execute: function () {
            Character = (function (_super) {
                __extends(Character, _super);
                function Character(name) {
                    var _this = _super.call(this) || this;
                    _this.name = name;
                    _this.inventory = [];
                    _this.location = "startLocation";
                    return _this;
                }
                Character.prototype.moveTo = function (location) {
                    console.log("Moving To " + location);
                };
                return Character;
            }(Unique_2.Unique));
        }
    };
});
System.register("models/Interactable", ["models/Unique"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Unique_3, Interactable;
    return {
        setters: [
            function (Unique_3_1) {
                Unique_3 = Unique_3_1;
            }
        ],
        execute: function () {
            Interactable = (function (_super) {
                __extends(Interactable, _super);
                function Interactable() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Interactable;
            }(Unique_3.Unique));
        }
    };
});
