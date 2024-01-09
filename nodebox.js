// Nodebox file system

// import { Nodebox } from "./@codesandbox/nodebox"
import { Nodebox } from "./node_modules/@codesandbox/nodebox"
// import * as nodebox from "@codesandbox/nodebox"
// const Nodebox = require("@codesandbox/nodebox")
const previewIframe = document.getElementById("preview-iframe")

async function init() {
    console.log("Partito")
    const runtime = new Nodebox({
        // Provide a reference to the <iframe> element in the DOM
        // where Nodebox should render the preview.
        iframe: document.getElementById("nodebox-iframe"),
    })

    // Establish a connection with the runtime environment.
    await runtime.connect()

    // Populate the in-memory file system of Nodebox
    // with a Next.js project files.
    await runtime.fs.init({
        "package.json": JSON.stringify({
            name: "whatsapp-web.js",
            version: "1.0.0",
            description:
                "Library for interacting with the WhatsApp Web API on the browser, using Playwright ",
            main: "./index.js",
            typings: "./index.d.ts",
            scripts: {
                test: "mocha tests --recursive --timeout 5000",
                "test-single": "mocha",
                shell: "node --experimental-repl-await ./shell.js",
                "generate-docs":
                    "node_modules/.bin/jsdoc --configure .jsdoc.json --verbose",
            },
            repository: {
                type: "git",
                url: "git+https://github.com/Belfio/whatsapp-web.js.git",
            },
            keywords: [
                "whatsapp",
                "whatsapp-web",
                "api",
                "bot",
                "client",
                "node",
                "playwright",
            ],
            author: "Alfredo Belfiori",
            license: "Apache-2.0",
            bugs: {
                url: "https://github.com/Belfio/whatsapp-web.js/issues",
            },
            homepage: "https://wwebjs.dev/",
            dependencies: {
                "@codesandbox/nodebox": "^0.1.8",
                "@pedroslopez/moduleraid": "^5.0.2",
                assert: "^2.0.0",
                browserfs: "^1.4.3",
                "browserify-zlib": "^0.2.0",
                "crypto-browserify": "^3.12.0",
                "fluent-ffmpeg": "^2.1.2",
                jsqr: "^1.3.1",
                mime: "^3.0.0",
                "node-fetch": "^2.6.5",
                "node-webpmux": "^3.1.0",
                "os-browserify": "^0.3.0",
                playwright: "^1.35.1",
                "stream-browserify": "^3.0.0",
                "tty-browserify": "^0.0.1",
                url: "^0.11.1",
                util: "^0.12.5",
            },
            devDependencies: {
                "@types/node-fetch": "^2.5.12",
                chai: "^4.3.4",
                "chai-as-promised": "^7.1.1",
                "css-loader": "^6.8.1",
                dotenv: "^16.0.0",
                eslint: "^8.4.1",
                "eslint-plugin-mocha": "^10.0.3",
                "file-loader": "^6.2.0",
                "html-loader": "^4.2.0",
                jsdoc: "^3.6.4",
                "jsdoc-baseline": "^0.1.5",
                mocha: "^9.0.2",
                sinon: "^13.0.1",
                "style-loader": "^3.3.3",
                webpack: "^5.88.1",
                "webpack-cli": "^5.1.4",
                "webpack-node-externals": "^3.0.0",
            },
            engines: {
                node: ">=12.0.0",
            },
            optionalDependencies: {
                archiver: "^5.3.1",
                "fs-extra": "^10.1.0",
                unzipper: "^0.10.11",
            },
        }),
        "index.js": `import { Client } from "./client/Client";
        console.log(Client)`,
    })

    // First, create a new shell instance.
    // You can use the same instance to spawn commands,
    // observe stdio, restart and kill the process.
    const shell = runtime.shell.create()

    // Then, let's run the "dev" script that we've defined
    // in "package.json" during the previous step.
    const nextProcess = await shell.runCommand("npm", ["dev"])

    // Find the preview by the process and mount it
    // on the preview iframe on the page.
    const previewInfo = await runtime.preview.getByShellId(nextProcess.id)
    previewIframe.setAttribute("src", previewInfo.url)
}

init()
