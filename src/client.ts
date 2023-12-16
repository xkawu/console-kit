import * as fs from "fs";
import chalk from "chalk";
import dayjs from "dayjs";

const colors = {
    blue: "#2D77E8",
    green: "#33D361",
    red: "#E23B3B",
    grey: "#4D4D4D",
};

interface ProgressBar {
    percentage: number;
    message: string;
    timestamp: boolean | null;
}

export class ConsoleKit {
    private _loaderInterval: ReturnType<typeof setInterval> | null = null;
    private _currentProgress: ProgressBar | null = null;

    comment(message: string, timestamp: boolean | null = null) {
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

    info(message: string, timestamp: boolean | null = null) {
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

    check(message: string, timestamp: boolean | null = null) {
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

    x(message: string, timestamp: boolean | null = null) {
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

    startLoading(message: string, timestamp: boolean | null = null) {
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

    stopLoading(clearLine: boolean | null = null) {
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

    startProgress(
        message: string,
        percentage: number = 0,
        timestamp: boolean | null = null
    ) {
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

    editProgress(percentage: number) {
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

    endProgress(clearLine: boolean | null = null) {
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

    prompt(message: string) {
        const prompt = (msg: string) => {
            fs.writeSync(1, String(msg));
            let s = "",
                buf = Buffer.alloc(1);
            while (buf[0] - 10 && buf[0] - 13)
                (s += buf), fs.readSync(0, buf, 0, 1, 0);
            return s.slice(1);
        };

        return prompt(`${chalk.hex(colors.grey)(">")}  ${message}`);
    }
}
