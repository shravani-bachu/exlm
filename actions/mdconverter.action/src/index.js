/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable import/no-relative-packages */
/* eslint-disable no-underscore-dangle */

const Logger = require("@adobe/aio-lib-core-logging");
const transform = require("./modules/clue/transformer/transformer.js");
let aioLogger = Logger("App");

function addExtensionIfNotExists(str, ext) {
  if (!str.endsWith(ext)) {
    return str + ext;
  }
  return str;
}

const parseDocsPath = (path) => {
  if (!path.startsWith("/")) {
    throw new Error("path must start with /");
  }
  const [, org, repo, branch, ...rest] = path.split("/");
  const fileName = rest[rest.length - 1];
  const folderPath = `/${rest.slice(0, -1).join("/")}`;
  return {
    org,
    repo,
    branch,
    fileName,
    folderPath,
  };
};

async function render(path) {
  // const mdPath = addExtensionIfNotExists(path, ".md");
  // const url = new URL(mdPath, "https://raw.githubusercontent.com");
  // const parsedPath = parseDocsPath(mdPath);
  // const resp = await fetch(url);
  // console.log("fetched..", url);

  // if (!resp.ok) {
  //   return { error: { code: resp.status, message: resp.statusText } };
  // }

  // const md = await resp.text();

  // const result = await transform({
  //   src: parsedPath.folderPath,
  //   file: parsedPath.fileName,
  //   raw: md,
  //   base: "",
  //   lang: "en",
  //   type: "docs",
  //   solution: [],
  //   admonition: {},
  // });

  // const html = result.lhtml.split("<body>")[1].split("</body>")[0];;


  // return { md, html };
  const html = `<div>
  <div class="carousel">
    <div>
      <div>
        <picture>
          <source type="image/webp" srcset="./media_155b25af34e98a6a947b87ecc48fc2d1ea50bc16a.png?width=2000&#x26;format=webply&#x26;optimize=medium" media="(min-width: 600px)">
          <source type="image/webp" srcset="./media_155b25af34e98a6a947b87ecc48fc2d1ea50bc16a.png?width=750&#x26;format=webply&#x26;optimize=medium">
          <source type="image/png" srcset="./media_155b25af34e98a6a947b87ecc48fc2d1ea50bc16a.png?width=2000&#x26;format=png&#x26;optimize=medium" media="(min-width: 600px)">
          <img loading="lazy" alt="" src="./media_155b25af34e98a6a947b87ecc48fc2d1ea50bc16a.png?width=750&#x26;format=png&#x26;optimize=medium" width="1600" height="900">
        </picture>
      </div>
      <div>
        <h2 id="wknd-adventures"><a href="/adventures">WKND Adventures</a></h2>
        <p>Join us on one of our next adventures. Browse our list of curated experiences and sign up for one when you're ready to explore with us. Test for demo!</p>
        <p><a href="/adventures">Book your trip now! 50% off</a></p>
      </div>
    </div>
  </div>
</div>
  `
  return { md: "hello", html };
}

async function main(params) {
  aioLogger.info({ params });
  const path = params.__ow_path ? params.__ow_path : "";
  const { html, error } = await render(path, { ...params });

  if (!error) {
    return {
      statusCode: 200,
      body: html,
    };
  }

  return { statusCode: error.code, body: error.message };
}




module.exports = {
  render,
  main,
}