(self.webpackChunk=self.webpackChunk||[]).push([[480],{371:()=>{chrome.runtime.onInstalled.addListener((({reason:e})=>{"install"===e&&chrome.storage.local.set({apiSuggestions:["tabs","storage","scripting"]})})),chrome.omnibox.onInputChanged.addListener((async(e,o)=>{await chrome.omnibox.setDefaultSuggestion({description:"Enter a Chrome API or choose from past searches"});const{apiSuggestions:s}=await chrome.storage.local.get("apiSuggestions");o(s.map((e=>({content:e,description:`Open chrome.${e} API`}))))})),chrome.omnibox.onInputEntered.addListener((e=>{chrome.tabs.create({url:"https://developer.chrome.com/docs/extensions/reference/"+e}),async function(e){const{apiSuggestions:o}=await chrome.storage.local.get("apiSuggestions");o.unshift(e),o.splice(4),chrome.storage.local.set({apiSuggestions:o})}(e)}))}},e=>{var o;o=371,e(e.s=o)}]);