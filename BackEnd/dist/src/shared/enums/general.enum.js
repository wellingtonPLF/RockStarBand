"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitTicketEnum = exports.MyEnum = void 0;
var MyEnum;
(function (MyEnum) {
    MyEnum["First"] = "1";
    MyEnum["Second"] = "2";
    MyEnum["Third"] = "3";
    MyEnum["Fourth"] = "4";
})(MyEnum || (exports.MyEnum = MyEnum = {}));
var LimitTicketEnum;
(function (LimitTicketEnum) {
    LimitTicketEnum[LimitTicketEnum["NORMAL"] = 10] = "NORMAL";
    LimitTicketEnum[LimitTicketEnum["FAN"] = 7] = "FAN";
    LimitTicketEnum[LimitTicketEnum["VIP"] = 5] = "VIP";
    LimitTicketEnum[LimitTicketEnum["SPECIAL"] = 3] = "SPECIAL";
    LimitTicketEnum[LimitTicketEnum["LEGEND"] = 1] = "LEGEND";
})(LimitTicketEnum || (exports.LimitTicketEnum = LimitTicketEnum = {}));
//# sourceMappingURL=general.enum.js.map