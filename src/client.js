import readline from "readline";
import chalk from "chalk";
import dayjs from "dayjs";

const colors = {
    blue: "#2D77E8",
    green: "#33D361",
    yellow: "#E9D71D",
    red: "#E23B3B",
    grey: "#4D4D4D",
};

export class ConsoleKit {
    _loaderInterval = null;
    _currentProgress = null;

    comment(message, timestamp = false) {
        const icon = "#";
        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        console.log(
            `${chalk.hex(colors.grey)(icon)}  ${chalk
                .hex(colors.grey)
                .italic(message + `${timestamp ? ` ❚ ${timeText}` : ""}`)}`
        );
    }

    info(message, timestamp = false) {
        const icon = "i";
        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        console.log(
            `${chalk.hex(colors.blue)(icon)}  ${message}${
                timestamp ? ` ❚ ${timeText}` : ""
            }`
        );
    }

    warn(message, timestamp = false) {
        const icon = "!";
        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        console.log(
            `${chalk.hex(colors.yellow)(icon)}  ${message}${
                timestamp ? ` ❚ ${timeText}` : ""
            }`
        );
    }

    check(message, timestamp = false) {
        const icon = "✓";
        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        console.log(
            `${chalk.hex(colors.green)(icon)}  ${message}${
                timestamp ? ` ❚ ${timeText}` : ""
            }`
        );
    }

    x(message, timestamp = false) {
        const icon = "✕";
        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        console.log(
            `${chalk.hex(colors.red)(icon)}  ${message}${
                timestamp ? ` ❚ ${timeText}` : ""
            }`
        );
    }

    startLoading(message, timestamp = false) {
        if (this._loaderInterval) {
            this.x(
                "A loader is already running. Stop it before wanting to start another one."
            );

            process.exit();
        }

        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        const P = ["\\", "|", "/", "-"];
        let x = 0;
        const loader = setInterval(() => {
            process.stdout.write(
                `${chalk.hex(colors.blue)(`\r${P[x++]}`)}  ${message}${
                    timestamp ? ` ❚ ${timeText}` : ""
                }`
            );
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
        } else {
            this.x(
                "No loader has been started. Please start a loader before wanting to stop one."
            );

            process.exit();
        }
    }

    startProgress(message, percentage = 0, timestamp = false) {
        if (this._currentProgress) {
            this.x(
                "A progress bar is already running. Stop it before wanting to start another one."
            );

            process.exit();
        }

        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        this._currentProgress = {
            percentage,
            message,
            timestamp,
        };

        const numOfDots = 20;
        let dots = ".".repeat(this._currentProgress.percentage / 5);
        let empty = " ".repeat(
            numOfDots - this._currentProgress.percentage / 5
        );

        process.stdout.write(
            `[${chalk.hex(colors.blue)(`${dots}${empty}`)}] ${chalk.bold(
                `${this._currentProgress.percentage}%`
            )} ~ ${message}${timestamp ? ` ❚ ${timeText}` : ""}`
        );
    }

    editProgress(percentage) {
        if (!this._currentProgress) {
            this.x("There is not progress bar running.");

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

        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        this._currentProgress.percentage = percentage;

        const numOfDots = 20;
        let dots = ".".repeat(this._currentProgress.percentage / 5);
        let empty = " ".repeat(
            numOfDots - this._currentProgress.percentage / 5
        );

        process.stdout.write(
            `\r[${chalk.hex(colors.blue)(`${dots}${empty}`)}] ${chalk.bold(
                `${this._currentProgress.percentage}%`
            )} ~ ${this._currentProgress.message}${
                this._currentProgress.timestamp ? ` ❚ ${timeText}` : ""
            }`
        );
    }

    endProgress(clearLine = false) {
        if (!this._currentProgress) {
            this.x("There is not progress bar running.");

            process.exit();
        }

        const timeText = dayjs(new Date(Date.now())).format(
            "HH:mm:ss DD/MM/YYYY"
        );

        this._currentProgress = null;

        if (clearLine) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        } else {
            process.stdout.write("\n");
        }
    }

    async prompt(message) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const answer = await new Promise((resolveOuter) => {
            rl.question(
                `${chalk.hex(colors.grey)(">")}  ${message}`,
                function (answer) {
                    resolveOuter(answer);
                    rl.close();
                }
            );
        });

        return await answer;
    }
}
