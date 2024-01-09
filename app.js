// Router -> Dashboard or Pull the Group Chat
// Does the person have already an account? Does the person have already GroupChats in their account?

// Here we start talking with the BE on AWS...?
// 1-loginwithwhatsapp
// 2-

// Login
// The user will login by scanning the QR code provided by Mr Whatsapp

import { Client, LocalAuth } from "./index"
import { Nodebox } from "@codesandbox/nodebox"
import repl from "repl"
const DEV = true

const runtime = new Nodebox({
    // Provide a reference to the <iframe> element in the DOM
    // where Nodebox should render the preview.
    iframe: document.getElementById("nodebox-iframe"),
})

// Establish a connection with the runtime environment.
await runtime.connect()

const client = new Client({
    puppeteer: { headless: true },
    authStrategy: new LocalAuth(),
})

console.log("Initializing...")
displayInitialization()

client.initialize()

client.on("loading_screen", (percent, message) => {
    console.log("LOADING SCREEN", percent, message)
})

client.on("qr", (QR) => {
    console.log("Please scan the QR code on the browser.", QR)
    displayQRCode(QR)
})

client.on("authenticated", (session) => {
    console.log(JSON.stringify(session))
    displayChatsLoader()
    // HTML from loading to open the chats page
})

// Pull the GroupChats
// List the GroupChats and let the user select the one they want to work on

client.on("ready", async () => {
    if (DEV) {
        const shell = repl.start("wwebjs> ")
        shell.context.client = client
        shell.on("exit", async () => {
            await client.destroy()
        })
    }

    const chats = await client.getChats()
    console.log(chats)
    displayChats()
    // HTML to show the groupchats nicely and allow the user to select which one they want to work on
})

const getAnalytics = async (groupChatId) => {
    // HTML to show the analytics
    displayAnalyticsLoader()
    const participants = await client.getGroupParticipants(groupChatId)
    const messages = await client.getGroupMessages(groupChatId)
    const analytics = crunchAnalytics(participants, messages)
    displayAnalytics(analytics)
}

function crunchAnalytics(participants, messages) {
    // Crunch the analytics
    return {}
}

function displayInitialization() {}
function displayQRCode(QR) {}
async function displayChatsLoader() {}
async function displayChats() {}
async function displayAnalyticsLoader() {}
async function displayAnalytics() {}

// GroupChat analysis
// Let the community manager review the stats and confirm the group chat is ready to be used

// Dashboard!!
// Here we have Data Analytics, Automation and planning, monetisation
