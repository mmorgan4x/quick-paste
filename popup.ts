


(async function () {
	//render page
	let entries = await background.execute<TextEntry[]>('/entries');
	render(entries);

	//add popup class when in popup view
	$('body').toggleClass('popup', chrome.extension.getViews({ type: "popup" }).length > 0);
	//new tab ctrl click
	$('body').on('click auxclick', 'a', async e => {
		if (e.ctrlKey || e.button == 1) {
			e.preventDefault();
			await new Promise(r => chrome.tabs.create({ url: e.currentTarget.href, selected: false }, r));
		}
	});

	//delete
	$('body').on('click', '.delete-btn', async e => {
		let index = +$(e.currentTarget).closest('.entry').data('id');
		let entries = htmlToEntries();
		entries.splice(index, 1)
		render(entries);
	});

	//add
	$('body').on('click', '.add-btn', async e => {
		let entries = htmlToEntries();
		entries.push({ text: '', folder: null, shortcut: null })
		render(entries);
	});

	//save
	$('body').on('click', '.save-btn', async e => {
		//TODO error check
		let entries = htmlToEntries();
		entries = await background.execute<TextEntry[]>('/entries/update', entries);
		render(entries);
	});

	//cancel
	$('body').on('click', '.cancel-btn', async e => {
		let entries = await background.execute<TextEntry[]>('/entries');
		render(entries);
	});


	$('body').on('change', 'select', () => contentAdded());
	$('body').on('change', '.folder-input', () => contentAdded());;

})();

function render(entries: TextEntry[]) {
	$('.entries').empty();
	for (let i = 0; i < entries.length; i++) {
		let entry = entries[i];
		$('.entries').append(parseHtml(/* html */`
			<tr class="entry" data-id="${i}">
				<td><input class="form-control text-input" value="${entry.text || ''}" placeholder="-"></td>
				<td><input class="form-control folder-input" value="${entry.folder || ''}" placeholder="none" list="folder-list"></td>}
				<td>
					<select class="form-select shortcut-input">
						<option ${!entry.shortcut ? 'selected' : ''} value="" class="empty">none</option>
						<option ${entry.shortcut == 'alt+1' ? 'selected' : ''}>alt+1</option>
						<option ${entry.shortcut == 'alt+2' ? 'selected' : ''}>alt+2</option>
						<option ${entry.shortcut == 'alt+3' ? 'selected' : ''}>alt+3</option>
					</select>
				</td>
				<td>
					<button class="btn btn-light delete-btn"><i class="bi bi-trash-fill"></i></button>
				</td>
			</tr>
		`));
	}

	contentAdded();
}

function contentAdded() {
	//muted placeholder
	$('select').each((i, t) => { $(t).toggleClass('empty', !$(t).val()) });

	// let folders = $('.folder-input').toArray().map(t => $(t).val()).filter((e, i, a) => e && a.indexOf(e) === i);
	let folders = htmlToEntries().map(t => t.folder).filter((e, i, a) => e && a.indexOf(e) === i);
	$('#folder-list').html(parseHtml(folders.map(f =>/* html */`<option value="${f}">`).join('')))

	//no data display
	$('.no-data').toggle(!$('.entry').length);
}

function htmlToEntries() {
	let entries: TextEntry[] = [];

	let htmlEntries = $('.entry').toArray();
	for (let htmlEntry of htmlEntries) {
		entries.push({
			text: $(htmlEntry).find('.text-input').val().toString() || null,
			folder: $(htmlEntry).find('.folder-input').val().toString() || null,
			shortcut: $(htmlEntry).find('.shortcut-input').val().toString() || null,
		})
	}

	return entries;
}

chrome.runtime.onMessage.addListener((msg, sender, send) => {
	new Promise<void>(async resolve => {
		//loading
		if (msg.route == '/loading') {
			resolve();
		}
	}).then(send)
	return true;
});


