chrome.runtime.onInstalled.addListener(() => init());

async function init() {

  console.log("Starting QuickPaste...");

  await updateContextMenus();

}

async function updateContextMenus() {
  await new Promise<void>(r => chrome.contextMenus.removeAll(r));

  let entries = await storage.getEntries();
  for (let entry of entries) {
    await new Promise<void>(r => chrome.contextMenus.create({ title: entry.text, id: entry.text, contexts: ["editable"] }, r));
  }
}
 
//background router
chrome.runtime.onMessage.addListener((msg, sender, send) => {
  new Promise<void | any>(async resolve => {
    //get entries
    if (msg.route == '/entries') {
      let entries = await storage.getEntries();
      resolve(entries)
    }

  }).then(send)
  return true;
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (text: string) => {
      let elem = document.activeElement as HTMLInputElement;
      let start = elem.selectionStart;
      let end = elem.selectionEnd;
      elem.value = elem.value.slice(0, start) + text + elem.value.slice(end);
      elem.selectionStart = start + text.length;
      elem.selectionEnd = elem.selectionStart;
    },
    args: [info.menuItemId]
  });
});