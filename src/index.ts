import { ConsoleKit } from "./client";

const consoleKit = new ConsoleKit();

(async () => {
  console.log(
    await consoleKit.select({
      values: ["this", "is", "a", "selection"],
    })
  );
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

  const answer = await consoleKit.prompt("This is a prompt");
  consoleKit.comment(`Answer is ${answer}`);

  const a = await consoleKit.yesno("aaaaa", false);

  consoleKit.startLoading("This is a loader...");
})();
