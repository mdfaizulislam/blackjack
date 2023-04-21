/**
 * Title: Logger
 * Description: This file is responsible for logging messages with more informative way
 * Author: Md Faizul Islam
 * Date: 08/01/2023
 *
 */

export class Logger {
    private mLogPrefix: string;
    private mLoggingEnabled: boolean;

    public static createLogger(
        prefix: string,
        loggingEnabled: boolean
    ): Logger {
        return new Logger(prefix, loggingEnabled);
    }
    constructor(prefix: string, loggingEnabled: boolean) {
        this.mLogPrefix = prefix + ': ';
        this.mLoggingEnabled = loggingEnabled;
    }

    Log(message: string, ...optionalParams: any[]) {
        if (!this.mLoggingEnabled) return;
        console.log(
            this.mLogPrefix,
            message,
            optionalParams.length == 0 ? '' : optionalParams
        );
    }

    Warn(message: string, ...optionalParams: any[]) {
        if (!this.mLoggingEnabled) return;
        console.warn(
            this.mLogPrefix,
            message,
            optionalParams.length == 0 ? '' : optionalParams
        );
    }

    Error(message: string, ...optionalParams: any[]) {
        if (!this.mLoggingEnabled) return;
        console.error(
            this.mLogPrefix,
            message,
            optionalParams.length == 0 ? '' : optionalParams
        );
    }
}
