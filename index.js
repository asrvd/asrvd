const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64");
const fetch = require("node-fetch");
//const { sha256 } = require("js-sha256").sha256;
require("dotenv").config();

const {
    GH_TOKEN: githubToken,
} = process.env;

const octokit = new Octokit({
    auth: `token ${githubToken}`,
});

async function main() {
    const sp_data = await fetch('https://spotify-np-api.vercel.app/api', {mode: 'cors'});
    const resp = await sp_data.json()
    await constructContent(resp)
    
}

async function constructContent(response) {
    let content = `
        <p align="center" style="color:blue"><samp>asheeshh</samp></p>

        <p align="center" style="color:blue">
        <samp>
            <a href="">18</a> .
            <a href="">solodev</a> .
            <a href="">melophile</a> .
            <a href="">weeb</a></br>
            <a href="">python</a> .
            <a href="">javascript</a> .
            <a href="">react</a> .
            <a href="">rust</a> .
            <a href="">ruby</a> .
            <a href="">go</a></br>
            <a href="${response.url}">spotify</a> .
            <a href="${response.url}">${response.song.toLowerCase().replace(" ", "-")}</a> .
            <a href="${response.url}">${response.artist.toLowerCase().replace(" ", "-")}</a>
        </samp>
        </p>

        <p align="center" style="color:blue"><samp>桜の花</samp></p>
    `
    const prevCont = await octokit.repos.getContent({
        owner: "asheeeshh",
        repo: "profile",
        path: "README.md"
    })
    await updateRepo(Base64.encode(content.replace(/[`\t\n\r]+/g, '').trim()), prevCont.data.sha)
}

async function updateRepo(cont, hash) {
    try {
        const { data } = await octokit.repos.createOrUpdateFileContents({
            // replace the owner and email with your own details
            owner: "asheeeshh",
            repo: "profile",
            path: "README.md",
            message: "update readme",
            content: cont,
            sha: hash,
            committer: {
                name: `Octokit Bot`,
                email: "asheeshh9@gmail.com",
            },
            author: {
                name: "Octokit Bot",
                email: "asheeshh9@gmail.com",
            },
        });
        console.log(data)
    } catch(err) {
        console.error(err)
    }
}

main();
