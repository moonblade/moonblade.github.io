var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("controllers/main", ["require", "exports", "../helpers/Contants.json"], function (require, exports, data) {
    "use strict";
    console.log(data["player"]);
    console.log(data);
});
define("models/Unique", ["require", "exports"], function (require, exports) {
    "use strict";
    var Unique = (function () {
        function Unique() {
        }
        return Unique;
    }());
    exports.Unique = Unique;
});
define("models/Box", ["require", "exports", "models/Unique"], function (require, exports, Unique_1) {
    "use strict";
    var Box = (function (_super) {
        __extends(Box, _super);
        function Box() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Box;
    }(Unique_1.Unique));
});
define("models/Character", ["require", "exports", "models/Unique"], function (require, exports, Unique_2) {
    "use strict";
    var Character = (function (_super) {
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
});
define("models/Interactable", ["require", "exports", "models/Unique"], function (require, exports, Unique_3) {
    "use strict";
    var Interactable = (function (_super) {
        __extends(Interactable, _super);
        function Interactable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Interactable;
    }(Unique_3.Unique));
});
