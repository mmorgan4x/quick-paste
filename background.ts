chrome.runtime.onInstalled.addListener(() => init());

async function init() {

  console.log("Starting QuickPaste...");

  await updateContextMenus();
}

//update context menus
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

//insert text of active element at cursor
function insertText(text: string) {
  let el = document.activeElement as HTMLInputElement;
  if (el) {
    let start = el.selectionStart;
    let end = el.selectionEnd;
    el.value = el.value.slice(0, start) + text + el.value.slice(end);
    el.selectionStart = start + text.length;
    el.selectionEnd = el.selectionStart;
  }
}

//background router
chrome.runtime.onMessage.addListener((msg, sender, send) => {
  new Promise<void | any>(async resolve => {
    //get entries
    console.log(msg)
    if (msg.route == 'GET/entries') {
      let entries = await storage.getEntries();
      resolve(entries)
    }
    //update entries
    if (msg.route == 'UPDATE/entries') {
      let entries: TextEntry[] = msg.data;
      await storage.setEntries(entries);
      await updateContextMenus();
      resolve(entries);
    }
  }).then(send);
  return true;
});

//handle context menu selections
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let text = info.menuItemId;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: insertText,
    args: [text]
  });
});

//handle shotcut events
chrome.commands.onCommand.addListener(async (command, tab) => {
  let entries = await storage.getEntries();
  let entry = entries.find(t => t.shortcut == command);
  if (entry) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: insertText,
      args: [entry.text]
    });
  }
});