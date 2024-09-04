import readline from "readline";
import chalk, { Chalk } from "chalk";
import dayjs from "dayjs";
import cliSelect from "cli-select";
import { EventEmitter } from "node:events";

const colors = {
  blue: "#2D77E8",
  green: "#33D361",
  yellow: "#E9D71D",
  red: "#E23B3B",
  grey: "#4D4D4D",
};

export interface ProgressBar {
  percentage: number;
  message: string;
  timestamp: boolean;
}

export interface SelectOptions {
  values: Array<string>;
  defaultValueIndex?: number;
  selectedText?: string;
  unselectedText?: string;
  cleanafter?: boolean;
}

// Logger
export class ConsoleKit {
  private _loaderInterval: ReturnType<typeof setInterval> | null = null;
  private _currentProgress: ProgressBar | null = null;

  comment(message: string, timestamp: boolean = false) {
    const icon = "#";
    const timeText = dayjs(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");

    console.log(
      `${chalk.hex(colors.grey)(icon)}  ${chalk
        .hex(colors.grey)
        .italic(message + `${timestamp ? ` ❚ ${timeText}` : ""}`)}`
    );
  }

  info(message: string, timestamp: boolean = false) {
    const icon = "i";
    const timeText = dayjs(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");

    console.log(
      `${chalk.hex(colors.blue)(icon)}  ${message}${
        timestamp ? ` ❚ ${timeText}` : ""
      }`
    );
  }

  warn(message: string, timestamp: boolean = false) {
    const icon = "!";
    const timeText = dayjs(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");

    console.log(
      `${chalk.hex(colors.yellow)(icon)}  ${message}${
        timestamp ? ` ❚ ${timeText}` : ""
      }`
    );
  }

  success(message: string, timestamp: boolean = false) {
    const icon = "✓";
    const timeText = dayjs(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");

    console.log(
      `${chalk.hex(colors.green)(icon)}  ${message}${
        timestamp ? ` ❚ ${timeText}` : ""
      }`
    );
  }

  error(message: string, timestamp: boolean = false) {
    const icon = "✕";
    const timeText = dayjs(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");

    console.log(
      `${chalk.hex(colors.red)(icon)}  ${message}${
        timestamp ? ` ❚ ${timeText}` : ""
      }`
    );
  }

  startLoading(message: string, timestamp: boolean = false) {
    if (this._loaderInterval) {
      throw new Error("a loading is already running");
    }

    const timeText = dayjs(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");

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

  stopLoading(clearLine: boolean = false) {
    if (this._loaderInterval) {
      clearInterval(this._loaderInterval);
      this._loaderInterval = null;

      if (clearLine) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
      }
    } else {
      throw new Error("no loading running");
    }
  }

  startProgress(
    message: string,
    percentage: number = 0,
    timestamp: boolean = false
  ) {
    if (this._currentProgress) {
      throw new Error("a progress bar is already running");
    }

    const timeText = dayjs(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");

    this._currentProgress = {
      percentage,
      message,
      timestamp,
    };

    const numOfDots = 20;
    let dots = ".".repeat(this._currentProgress.percentage / 5);
    let empty = " ".repeat(numOfDots - this._currentProgress.percentage / 5);

    process.stdout.write(
      `[${chalk.hex(colors.blue)(`${dots}${empty}`)}] ${chalk.bold(
        `${this._currentProgress.percentage}%`
      )} ~ ${message}${timestamp ? ` ❚ ${timeText}` : ""}`
    );
  }

  editProgress(percentage: number, message: string) {
    if (!this._currentProgress) {
      throw new Error("no progress bar running");
    }

    if (percentage > 100) {
      throw new Error("progress bar percentage cannot go above 100");
    }

    if (percentage < 0) {
      throw new Error("progress bar percentage cannot go below 0");
    }

    const timeText = dayjs(new Date(Date.now())).format("HH:mm:ss DD/MM/YYYY");

    this._currentProgress.percentage = percentage;

    if (message) {
      this._currentProgress.message = message;
    }

    const numOfDots = 20;
    let dots = ".".repeat(this._currentProgress.percentage / 5);
    let empty = " ".repeat(numOfDots - this._currentProgress.percentage / 5);

    process.stdout.write(
      `\r[${chalk.hex(colors.blue)(`${dots}${empty}`)}] ${chalk.bold(
        `${this._currentProgress.percentage}%`
      )} ~ ${this._currentProgress.message}${
        this._currentProgress.timestamp ? ` ❚ ${timeText}` : ""
      }`
    );
  }

  endProgress(clearLine: boolean = false) {
    if (!this._currentProgress) {
      throw new Error("no progress bar running");
    }

    this._currentProgress = null;
    if (clearLine) {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    } else {
      process.stdout.write("\n");
    }
  }

  async prompt(message: string, character?: string) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer: string = await new Promise((resolveOuter) => {
      rl.question(
        `${chalk.hex(colors.blue)(
          character ? character : "?"
        )}  ${message} ${chalk.hex(colors.grey)(">")} `,
        function (answer) {
          resolveOuter(answer);
          rl.close();
        }
      );
    });

    return answer;
  }

  async yesno(message: string, defaultValue: boolean) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer: string = await new Promise((resolveOuter) => {
      rl.question(
        `${chalk.hex(colors.grey)("[")}${
          defaultValue ? chalk.hex(colors.green)("Y") : "Y"
        }${chalk.hex(colors.grey)("/")}${
          defaultValue ? "N" : chalk.hex(colors.red)("N")
        }${chalk.hex(colors.grey)("]")}  ${message} ${chalk.hex(colors.grey)(
          ">"
        )} `,
        function (answer) {
          resolveOuter(answer);
          rl.close();
        }
      );
    });

    let result: boolean = defaultValue;
    if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
      result = true;
    } else if (answer.toLowerCase() === "n" || answer.toLowerCase() === "no") {
      result = false;
    }

    return result;
  }

  async select(selectOptions: SelectOptions) {
    return new Promise((resolve, reject) => {
      const options = {
        values: selectOptions.values,
        defaultValue: selectOptions.defaultValueIndex || 0,
        selected:
          selectOptions.selectedText || `[ ${chalk.hex(colors.blue)("•")} ]`,
        unselected: selectOptions.selectedText || `[   ]`,
        cleanup: selectOptions.cleanafter || true,
      };

      cliSelect(options).then(resolve).catch(reject);
    });
  }
}

// Debugger
export class Debugger extends EventEmitter {
  constructor() {
    super();
  }
}

interface DebuggerEvents {
  debug: (message: string) => void;
}

export declare interface Debugger {
  on<U extends keyof DebuggerEvents>(
    event: U,
    listener: DebuggerEvents[U]
  ): this;

  emit<U extends keyof DebuggerEvents>(
    event: U,
    ...args: Parameters<DebuggerEvents[U]>
  ): boolean;
}

// Styling
export { bold, italic, underline } from "chalk";
