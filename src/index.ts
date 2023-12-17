import { ConsoleKit } from "./client";

const consoleKit = new ConsoleKit();

(async () => {
    consoleKit.comment("Comment without timestamp");
    consoleKit.check("Check without timestamp");
    consoleKit.info("Info without timestamp");
    consoleKit.warn("Warn without timestamp");
    consoleKit.x("Error without timestamp");

    console.log(" ");

    consoleKit.comment("Comment with timestamp", true);
    consoleKit.check("Check with timestamp", true);
    consoleKit.info("Info with timestamp", true);
    consoleKit.warn("Warn with timestamp", true);
    consoleKit.x("Error with timestamp", true);

    consoleKit.startProgress("Progress Bar without timestamp", 25);
    consoleKit.endProgress();

    consoleKit.startProgress("Progress Bar with timestamp", 25, true);
    consoleKit.endProgress();

    const answer = await consoleKit.prompt("This is a prompt");
    consoleKit.comment(`Answer is ${answer}`);

    consoleKit.startLoading("This is a loader...");
})();
