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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleKit = void 0;
const readline_1 = __importDefault(require("readline"));
const chalk_1 = __importDefault(require("chalk"));
const dayjs_1 = __importDefault(require("dayjs"));
const colors = {
    blue: "#2D77E8",
    green: "#33D361",
    yellow: "#E9D71D",
    red: "#E23B3B",
    grey: "#4D4D4D",
};
class ConsoleKit {
    constructor() {
        this._loaderInterval = null;
        this._currentProgress = null;
    }
    comment(message, timestamp = false) {
        const icon = "#";
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        console.log(`${chalk_1.default.hex(colors.grey)(icon)}  ${chalk_1.default
            .hex(colors.grey)
            .italic(message + `${timestamp ? ` ❚ ${timeText}` : ""}`)}`);
    }
    info(message, timestamp = false) {
        const icon = "i";
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        console.log(`${chalk_1.default.hex(colors.blue)(icon)}  ${message}${timestamp ? ` ❚ ${timeText}` : ""}`);
    }
    warn(message, timestamp = false) {
        const icon = "!";
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        console.log(`${chalk_1.default.hex(colors.yellow)(icon)}  ${message}${timestamp ? ` ❚ ${timeText}` : ""}`);
    }
    check(message, timestamp = false) {
        const icon = "✓";
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        console.log(`${chalk_1.default.hex(colors.green)(icon)}  ${message}${timestamp ? ` ❚ ${timeText}` : ""}`);
    }
    x(message, timestamp = false) {
        const icon = "✕";
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        console.log(`${chalk_1.default.hex(colors.red)(icon)}  ${message}${timestamp ? ` ❚ ${timeText}` : ""}`);
    }
    startLoading(message, timestamp = false) {
        if (this._loaderInterval) {
            this.x("A loader is already running. Stop it before wanting to start another one.");
            process.exit();
        }
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        const P = ["\\", "|", "/", "-"];
        let x = 0;
        const loader = setInterval(() => {
            process.stdout.write(`${chalk_1.default.hex(colors.blue)(`\r${P[x++]}`)}  ${message}${timestamp ? ` ❚ ${timeText}` : ""}`);
            x %= P.length;
        }, 50);
        this._loaderInterval = loader;
    }
    stopLoading(clearLine = false) {
        if (this._loaderInterval) {
            clearInterval(this._loaderInterval);
            this._loaderInterval = null;
            if (clearLine) {
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
            }
        }
        else {
            this.x("No loader has been started. Please start a loader before wanting to stop one.");
            process.exit();
        }
    }
    startProgress(message, percentage = 0, timestamp = false) {
        if (this._currentProgress) {
            this.x("A progress bar is already running. Stop it before wanting to start another one.");
            process.exit();
        }
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        this._currentProgress = {
            percentage,
            message,
            timestamp,
        };
        const numOfDots = 20;
        let dots = ".".repeat(this._currentProgress.percentage / 5);
        let empty = " ".repeat(numOfDots - this._currentProgress.percentage / 5);
        process.stdout.write(`[${chalk_1.default.hex(colors.blue)(`${dots}${empty}`)}] ${chalk_1.default.bold(`${this._currentProgress.percentage}%`)} ~ ${message}${timestamp ? ` ❚ ${timeText}` : ""}`);
    }
    editProgress(percentage, message = undefined) {
        if (!this._currentProgress) {
            this.x("There is no progress bar running.");
            process.exit();
        }
        if (percentage > 100) {
            this.x("You cannot go above 100%.");
            process.exit();
        }
        if (percentage < 0) {
            this.x("You cannot go below 0%.");
            process.exit();
        }
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        this._currentProgress.percentage = percentage;
        if (message) {
            this._currentProgress.message = message;
        }
        const numOfDots = 20;
        let dots = ".".repeat(this._currentProgress.percentage / 5);
        let empty = " ".repeat(numOfDots - this._currentProgress.percentage / 5);
        process.stdout.write(`\r[${chalk_1.default.hex(colors.blue)(`${dots}${empty}`)}] ${chalk_1.default.bold(`${this._currentProgress.percentage}%`)} ~ ${this._currentProgress.message}${this._currentProgress.timestamp ? ` ❚ ${timeText}` : ""}`);
    }
    endProgress(clearLine = false) {
        if (!this._currentProgress) {
            this.x("There is no progress bar running.");
            process.exit();
        }
        const timeText = (0, dayjs_1.default)(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");
        this._currentProgress = null;
        if (clearLine) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }
        else {
            process.stdout.write("\n");
        }
    }
    prompt(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const rl = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            const answer = yield new Promise((resolveOuter) => {
                rl.question(`${chalk_1.default.hex(colors.blue)("?")}  ${message} ${chalk_1.default.hex(colors.grey)(">")} `, function (answer) {
                    resolveOuter(answer);
                    rl.close();
                });
            });
            return yield answer;
        });
    }
}
exports.ConsoleKit = ConsoleKit;
