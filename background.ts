chrome.runtime.onInstalled.addListener(() => init());

async function init() {
 
  console.log("Starting Tracker...");

  chrome.alarms.create('alarm1', { periodInMinutes: 15 })
  chrome.contextMenus.create({ title: `Tracker App - add track for "%s"`, contexts: ["selection"], id: 'ADD:TRACK' });

  await setBadge(0);
  // await update();
}

async function refreshAll() {
  console.log('updating all...');

  let trackingNumbers = (await storage.getTracks()).map(t => t.trackingNumber);
  for (let trackingNumber of trackingNumbers) {
    await refreshTrack(trackingNumber);
  }

  console.log('update complete');
}

async function refreshTrack(trackingNumber: string) {
  console.log(`updating ${trackingNumber}...`);
  await storage.setLoadingTrack(trackingNumber, true);
  await popup.execute('/loading');

  let oldTrack = await storage.getTrack(trackingNumber);
  let track = await api.fetchTrack(trackingNumber);
  if (!track) {
    await storage.setLoadingTrack(trackingNumber, false);
    await popup.execute('/loading');
    console.log(`error updating ${trackingNumber}`);
  }

  if (track.status != oldTrack.status) {
    await notify(track.status, track.trackingNumber);
    let unreadTracks = await storage.getUnreadTracks();
    if (!unreadTracks.includes(trackingNumber)) {
      unreadTracks.push(trackingNumber);
      await storage.setUnreadTracks(unreadTracks);
      setBadge(unreadTracks.length);
    }
  }

  track.updateCount = (track.updateCount || 0) + 1;
  await storage.setTrack(track);

  await storage.setLoadingTrack(trackingNumber, false);
  await popup.execute('/loading');
  console.log(`updated ${trackingNumber}`);
}


async function addTrack(trackingNumber: string) {
  let tracks = await storage.getTracks();

  if (!tracks.find(t => t.trackingNumber == trackingNumber)) {
    tracks.push({ trackingNumber });
    await storage.setTracks(tracks);
    await notifySilent('Track added', trackingNumber);
  }
  else {
    await notifySilent('Track already exists', trackingNumber);
  }
}

async function notify(title: string, message?: string) {
  return await new Promise<string>(r => chrome.notifications.create(null, { type: 'basic', iconUrl: 'images/icon.png', title, message }, r));
}

async function notifySilent(title: string, message?: string) {
  return await new Promise<string>(r => chrome.notifications.create(null, { type: 'basic', iconUrl: 'images/icon.png', title, message, silent: true }, r));
}

//background router
chrome.runtime.onMessage.addListener((msg, sender, send) => {
  new Promise<void | any>(async resolve => {
    //refresh all
    if (msg.route == '/refresh') {
      await refreshAll();
      resolve(null)
    }
    //sort
    if (msg.route == '/sort') {
      let tracks = await storage.getTracks();
      let asc = tracks.concat().sort((a, b) => (new Date(a.date).getTime() || Infinity) - (new Date(b.date).getTime() || Infinity));
      let desc = asc.concat().reverse();
      tracks = JSON.stringify(tracks) == JSON.stringify(asc) ? desc : asc;
      await storage.setTracks(tracks);
      resolve(null)
    }
    //get tracks
    if (msg.route == '/tracks') {
      let tracks = await storage.getTracks();
      resolve(tracks)
    }
    //get track
    if (msg.route == '/tracks/get') {
      let id: string = msg.data;
      let tracks = await storage.getTracks();
      let track = tracks.find(t => t.trackingNumber == id);
      resolve(track);
    }
    //update track
    if (msg.route == '/tracks/update') {
      let newTrack: Track = msg.data;
      let tracks = await storage.getTracks();
      let track = tracks.find(t => t.trackingNumber == newTrack.trackingNumber);
      Object.assign(track, newTrack);
      await storage.setTracks(tracks);
      resolve(null);
    }
    //delete track
    if (msg.route == '/tracks/delete') {
      let id: string = msg.data;
      let tracks = await storage.getTracks();
      let i = tracks.findIndex(t => t.trackingNumber == id);
      if (i >= 0) {
        tracks.splice(i, 1);
        await storage.setTracks(tracks);
      }
      resolve(null);
    }
    //refresh track
    if (msg.route == '/tracks/refresh') {
      let id: string = msg.data;
      await refreshTrack(id);
      resolve(null);
    }
    //move track up
    if (msg.route == '/tracks/move-up') {
      let id: string = msg.data;
      let tracks = await storage.getTracks();
      let i = tracks.findIndex(t => t.trackingNumber == id);
      if (i - 1 >= 0) {
        let track = tracks[i];
        tracks.splice(i, 1);
        tracks.splice(i - 1, 0, track);
        await storage.setTracks(tracks);
      }
      resolve(null);
    }
    //move track down
    if (msg.route == '/tracks/move-down') {
      let id: string = msg.data;
      let tracks = await storage.getTracks();
      let i = tracks.findIndex(t => t.trackingNumber == id);
      if (i + 1 <= tracks.length) {
        let track = tracks[i];
        tracks.splice(i, 1);
        tracks.splice(i + 1, 0, track);
        await storage.setTracks(tracks);
      }
      resolve(null);
    }
    //delete track
    if (msg.route == '/tracks/delete') {
      let id: string = msg.data;
      let tracks = await storage.getTracks();
      let i = tracks.findIndex(t => t.trackingNumber == id);
      if (i >= 0) {
        tracks.splice(i, 1);
        await storage.setTracks(tracks);
      }
      resolve(null);
    }
    //get unreads
    if (msg.route == '/unreads') {
      let unreads = await storage.getUnreadTracks();
      resolve(unreads)
    }
    //clear unreads
    if (msg.route == '/unreads/clear') {
      await storage.setUnreadTracks([]);
      await setBadge(0);
      resolve(null);
    }
    //get loading tracks
    if (msg.route == '/loading') {
      let loadingTracks = await storage.getLoadingTracks();
      resolve(loadingTracks)
    }
    resolve(null);
  }).then(send)
  return true;
});

chrome.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId == 'ADD:TRACK') { addTrack(info.selectionText) }
});

chrome.alarms.onAlarm.addListener(info => {
  if (info.name == 'alarm1') { refreshAll() }
});

async function setBadge(count: number, isError?: boolean) {
  let color = isError ? '#dc3545' : '#28a745';
  await new Promise<void>(r => chrome.action.setBadgeBackgroundColor({ color: color }, r));
  await new Promise<void>(r => chrome.action.setBadgeText({ text: count ? count.toString() : '' }, r));
}



//-----------



