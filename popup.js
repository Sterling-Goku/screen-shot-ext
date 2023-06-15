'use strict';

async function captureFullPage(event) {
  let tab = await fetchCurrentTab()
  window.chrome.tabs.sendMessage(tab.id, {
    capture_full_page: true
  })
}
async function captureSelection(event) {
  let tab = await fetchCurrentTab()
  window.chrome.tabs.sendMessage(tab.id, {
    capture_selection: true
  })
}

function fetchCurrentTab () {
  return new Promise((resolve, reject) => {
      window.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length !== 0) {
              resolve(tabs[0])
          }
          reject("Not fetched!")
      })
  })
}

window.document.getElementById('c-selection').addEventListener('click', captureSelection);
window.document.getElementById('c-fullpage').addEventListener('click', captureFullPage);
window.addEventListener('load', () => {console.log("loaded")})