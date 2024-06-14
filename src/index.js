"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const consoleKit = new client_1.ConsoleKit();
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield consoleKit.select({
        values: ["this", "is", "a", "selection"],
    }));
    consoleKit.comment("Comment without timestamp");
    consoleKit.success("Success without timestamp");
    consoleKit.info("Info without timestamp");
    consoleKit.warn("Warn without timestamp");
    consoleKit.error("Error without timestamp");
    console.log(" ");
    consoleKit.comment("Comment with timestamp", true);
    consoleKit.success("Check with timestamp", true);
    consoleKit.info("Info with timestamp", true);
    consoleKit.warn("Warn with timestamp", true);
    consoleKit.error("Error with timestamp", true);
    consoleKit.startProgress("Progress Bar without timestamp", 25);
    consoleKit.endProgress();
    consoleKit.startProgress("Progress Bar with timestamp", 25, true);
    consoleKit.endProgress();
    const answer = yield consoleKit.prompt("This is a prompt");
    consoleKit.comment(`Answer is ${answer}`);
    const a = yield consoleKit.yesno("aaaaa", false);
    consoleKit.startLoading("This is a loader...");
}))();
