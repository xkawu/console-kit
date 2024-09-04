# Console-kit

A `fast`, `light weight`, `minimalist` and `reliable` module to log stuff easly and more understable.

## Installation

Use this command to add Console-kit

```bash
  npm i @kawu/console-kit
```

## Usage

### TS

```ts
import { ConsoleKit } from "@kawu/console-kit";
const consoleKit = new ConsoleKit();
```

### JS

```js
const { ConsoleKit } = require("@kawu/console-kit");
const consoleKit = new ConsoleKit();
```

## Logging

When logging what's going on in your application is crucial, I have dedicated functions for every situation.

![Example](https://i.imgur.com/oFEckxL.png)

![Example](https://i.imgur.com/iTBJ0xO.png)

### Comments

```js
consoleKit.comment(CommentOptions);
```

```ts
// CommentOptions

message: string;
timestamp: boolean; // Not required
```

### Success

```js
consoleKit.success(CheckOptions);
```

```ts
// CheckOptions

message: string;
timestamp: boolean; // Not required
```

### Info

```js
consoleKit.info(InfoOptions);
```

```ts
// InfoOptions

message: string;
timestamp: boolean; // Not required
```

### Warn

```js
consoleKit.warn(WarnOptions);
```

```ts
// WarnOptions

message: string;
timestamp: boolean; // Not required
```

### Error

```js
consoleKit.error(ErrorOptions);
```

```ts
// ErrorOptions

message: string;
timestamp: boolean; // Not required
```

## Loading

This is kinda usefull to tell that your terminal is doing background stuff.

![Example](https://i.imgur.com/FQbYMWk.png)

### Start loader

```js
consoleKit.startLoading(StartLoaderOptions);
```

```ts
// StartLoaderOptions

message: string;
timestamp: boolean; // Not required
```

### Stop loader

```js
consoleKit.stopLoading(StopLoaderOptions);
```

```ts
// StopLoaderOptions

clearLine: boolean; // Remove the loading line if true
```

## Progress Bar

Like the loading but we know when the loading will finish.

![Example](https://i.imgur.com/kWWkqpQ.png)

### Start progress bar

```js
consoleKit.startProgress(StartProgressOptions);
```

```ts
// StartProgressOptions

message: string;
percentage: number;
timestamp: boolean; // Not required
```

### Edit the actual progress bar

```js
consoleKit.editProgress(EditProgressOptions);
```

```ts
// EditProgressOptions

percentage: number;
message: string;
```

### End progress bar

```js
consoleKit.endProgress(EndProgressOptions);
```

```ts
// EndProgressOptions

clearLine: boolean; // Remove the progress bar line if true
```

## Prompt

If your user need to give you data, then the prompt is a good way to go.

![Example](https://i.imgur.com/g8pN4Fm.png)

### Usage

```js
consoleKit.prompt(PromptOptions);
```

```ts
// PromptOptions

message: string;
character: string; // Not required -- If you wish to replace "?", put your own icon here
```

### Output

```ts
string;
```

## YesNo

It's like prompt but for boolean values.

![Example](https://i.imgur.com/Clkw4bY.png)

### Usage

```js
consoleKit.yesno(YesNoOptions);
```

```ts
// YesNoOptions

message: string;
defaultValue: boolean; // true = yes | false = no
```

### Output

If the default value is `false` and the user send for example `lol` then the output will be `false` because he didn't put `no`/`n` or `yes`/`y`.

```ts
boolean;
```

## Select

You have a list and your user have to select an item inside a list, then this will do the job.

![Example](https://i.imgur.com/KMQKo0q.png)

```js
consoleKit.select(SelectOptions);
```

```ts
values: Array<string>;
defaultValueIndex: number; // Not required -- Index number of the values array
selectedText: string; // Not required -- Custom the "[ • ]" (Item selected)
unselectedText: string; // Not required -- Custom the "[  ]" (Item not selected)
cleanafter: boolean; // Not required -- Remove the selection of the terminal when user finished
```
