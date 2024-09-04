/// <reference types="node" />
import { EventEmitter } from "node:events";
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
export declare class ConsoleKit {
    private _loaderInterval;
    private _currentProgress;
    comment(message: string, timestamp?: boolean): void;
    info(message: string, timestamp?: boolean): void;
    warn(message: string, timestamp?: boolean): void;
    success(message: string, timestamp?: boolean): void;
    error(message: string, timestamp?: boolean): void;
    startLoading(message: string, timestamp?: boolean): void;
    stopLoading(clearLine?: boolean): void;
    startProgress(message: string, percentage?: number, timestamp?: boolean): void;
    editProgress(percentage: number, message: string): void;
    endProgress(clearLine?: boolean): void;
    prompt(message: string, character?: string): Promise<string>;
    yesno(message: string, defaultValue: boolean): Promise<boolean>;
    select(selectOptions: SelectOptions): Promise<unknown>;
}
export declare class Debugger extends EventEmitter {
    constructor();
}
interface DebuggerEvents {
    debug: (message: string) => void;
}
export declare interface Debugger {
    on<U extends keyof DebuggerEvents>(event: U, listener: DebuggerEvents[U]): this;
    emit<U extends keyof DebuggerEvents>(event: U, ...args: Parameters<DebuggerEvents[U]>): boolean;
}
export { bold, italic, underline } from "chalk";
