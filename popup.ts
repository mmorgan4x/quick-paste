


(async function () {
	//render page
	let entries = await background.execute<TextEntry[]>('GET/entries');
	render(entries);

	//add popup class when in popup view
	setTimeout(() => {
		$('body').toggleClass('popup', chrome.extension.getViews({ type: "popup" }).length > 0);
	});
	//new tab ctrl click
	$('body').on('click auxclick', 'a', async e => {
		if (e.ctrlKey || e.button == 1) {
			e.preventDefault();
			await new Promise(r => chrome.tabs.create({ url: e.currentTarget.href, selected: false }, r));
		}
	});
	//goto options page
	$('body').on('click', '.options-btn', async e => {
		await new Promise<void>(r => chrome.runtime.openOptionsPage(r));
	});
	//goto blur from status text
	$('body').on('click', async e => {
		renderStatus();
	});


	//copy
	$('body').on('click', '.copy-btn', async e => {
		let textEl = $(e.currentTarget).closest('.entry').find('.text-input');
		textEl.select();
		document.execCommand('copy');
	});

	//delete
	$('body').on('click', '.delete-btn', async e => {
		let index = +$(e.currentTarget).closest('.entry').data('index');
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
		setTimeout(async () => {
			let errors = checkValid();
			if (!errors.length) {
				//TODO error check
				let entries = htmlToEntries();
				entries = await background.execute<TextEntry[]>('UPDATE/entries', entries);
				$('.status-success').removeClass('hidden');
				render(entries);
				renderStatus('Saved');
			}
			else {
				renderStatus(errors[0], true);
			}
		});

	});

	//cancel
	$('body').on('click', '.cancel-btn', async e => {
		let entries = await background.execute<TextEntry[]>('GET/entries');
		render(entries);
		renderStatus('Canceled');
	});


	$('body').on('change', 'select', () => contentAdded());
	$('body').on('change', '.folder-input', () => contentAdded());;

})();

function render(entries: TextEntry[]) {
	$('.entries').empty();
	for (let i = 0; i < entries.length; i++) {
		let entry = entries[i];
		$('.entries').append(parseHtml(/* html */`
			<tr class="entry" data-index="${i}">
				<td>
					<button class="btn btn-light copy-btn" title="copy"><i class="bi bi-clipboard"></i></button>
				</td>
				<td><input class="form-control text-input" value="${entry.text || ''}" placeholder="text"></td>
				<td><input class="form-control folder-input" value="${entry.folder || ''}" placeholder="none" list="folder-list"></td>}
				<td>
					<select class="form-select shortcut-input">
						<option ${!entry.shortcut ? 'selected' : ''} value="" class="empty">none</option>
						<option ${entry.shortcut == 'alt+1' ? 'selected' : ''}>alt+1</option>
						<option ${entry.shortcut == 'alt+2' ? 'selected' : ''}>alt+2</option>
						<option ${entry.shortcut == 'alt+3' ? 'selected' : ''}>alt+3</option>
						<option ${entry.shortcut == 'alt+4' ? 'selected' : ''}>alt+4</option>
					</select>
				</td>
				<td>
					<button class="btn btn-light delete-btn" title="delete"><i class="bi bi-trash-fill"></i></button>
				</td>
			</tr>
		`));
	}
	if (!entries.length) {
		$('.entries').append(parseHtml(/* html */`
		<tr class="no-data">
			<td colspan="5">No entries have been added.</td>
		</tr>
	`));
	}

	contentAdded();
}

function contentAdded() {
	//muted placeholder
	$('select').each((i, t) => { $(t).toggleClass('empty', !$(t).val()) });

	//folders suto fill list
	let folders = htmlToEntries().map(t => t.folder).filter((e, i, a) => e && a.indexOf(e) === i);
	$('#folder-list').html(parseHtml(folders.map(f =>/* html */`<option value="${f}">`).join('')))
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

function checkValid() {
	let entries = htmlToEntries();
	let errors: string[] = [];

	if (entries.find(t => !t.text)) { errors.push('Text field is required for each entry') }
	if (!entries.map(t => t.text).every((e, i, arr) => arr.indexOf(e) == i)) { errors.push('All text fields must be unique') }
	if (!entries.map(t => t.shortcut).filter(t => t).every((e, i, arr) => arr.indexOf(e) == i)) { errors.push('Shortcut cannot be used on multiple entries') }

	return errors;
}

let timeout;
function renderStatus(text?: string, isError?: boolean) {
	if (text) {
		if (isError) {
			$('.status').html(`<div class="text-danger"><i class="bi bi-exclamation-diamond"></i> ${text}</div>`);
		}
		else {
			$('.status').html(`<div class="text-success"><i class="bi bi-check"></i> ${text}</div>`);
		}

		$('.status').removeClass('hidden');
		// clearTimeout(timeout);
		// timeout = setTimeout(() => {
		// 	$('.status').addClass('hidden');
		// }, 3000)
	}
	else {
		$('.status').addClass('hidden');
	}
}