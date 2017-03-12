var Box = (function () {
    function Box() {
    }
    return Box;
}());
var Character = (function () {
    function Character(name) {
        this.name = name;
        this.inventory = [];
        this.location = "startLocation";
    }
    return Character;
}());
