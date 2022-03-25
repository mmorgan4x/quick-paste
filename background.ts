chrome.runtime.onInstalled.addListener(() => init());

async function init() {

  console.log("Starting QuickPaste...");

  await updateContextMenus();

}

async function updateContextMenus() {
  await new Promise<void>(r => chrome.contextMenus.removeAll(r));

  let entries = await storage.getEntries();
  let folders = [];
  for (let entry of entries) {
    if (entry.folder && !folders.includes(entry.folder)) {
      await new Promise<void>(r => chrome.contextMenus.create({ title: entry.folder, id: `${entry.folder}_folder`, contexts: ["editable"] }, r));
      folders.push(entry.folder)
    }
    await new Promise<void>(r => chrome.contextMenus.create({ title: entry.text, id: entry.text, parentId: entry.folder ? `${entry.folder}_folder` : null, contexts: ["editable"] }, r));
  }
}

//background router
chrome.runtime.onMessage.addListener((msg, sender, send) => {
  new Promise<void | any>(async resolve => {
    //get entries
    console.log(msg)
    if (msg.route == '/entries') {
      let entries = await storage.getEntries();
      resolve(entries)
    }
    //update track
    if (msg.route == '/entries/update') {
      let entries: TextEntry[] = msg.data;
      await storage.setEntries(entries);
      await updateContextMenus();
      resolve(entries);
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