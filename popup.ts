


(async function () {
	//add popup class when in popup view
	$('body').toggleClass('popup', chrome.extension.getViews({ type: "popup" }).length > 0);


	//menu buttons
	$('body').on('click', '.refresh-all-btn', async e => {
		await background.execute('/refresh');
		render();
	});

	$('body').on('click', '.options-btn', async e => {
		await new Promise<void>(r => chrome.runtime.openOptionsPage(r));
	});

	$('body').on('click', '.sort-btn', async e => {
		await background.execute('/sort');
		render();
	});

	//item buttons
	$('body').on('click', '.refresh-btn', async e => {
		let id = $(e.currentTarget).data('id');
		await background.execute('/tracks/refresh', id);
		render();
	});

	$('body').on('click', '.delete-btn', async e => {
		let id = $(e.currentTarget).data('id');
		await background.execute('/tracks/delete', id);
		render();
	});

	$('body').on('click', '.move-up-btn', async e => {
		let id = $(e.currentTarget).data('id');
		await background.execute('/tracks/move-up', id);
		render();
	});

	$('body').on('click', '.move-down-btn', async e => {
		let id = $(e.currentTarget).data('id');
		await background.execute('/tracks/move-down', id);
		render();
	});

	$('body').on('click', '.edit-btn', async e => {
		let id = $(e.currentTarget).data('id');
		let track = await background.execute<Track>('/tracks/get', id);

		$('.edit-save-btn').data('id', track.trackingNumber);
		$('.edit-description').val(track.description);
		$('#edit-modal').modal('show');
		render();
	});

	$('body').on('click', '.edit-save-btn', async e => {
		let id = $(e.currentTarget).data('id');
		let description = $('.edit-description').val();
		await background.execute<void>('/tracks/update', { trackingNumber: id, description });

		$('#edit-modal').modal('hide');
		render();
	});

	//page events
	$('body').on('click auxclick', 'a', async e => {
		if (e.ctrlKey || e.button == 1) {
			e.preventDefault();
			await new Promise(r => chrome.tabs.create({ url: e.currentTarget.href, selected: false }, r));
		}
	});


	//render page
	await render();

	//flash unread rows
	let unreads = await background.execute<string[]>('/unreads');
	unreads.forEach(t => $(`.tracks tr[data-id='${t}'`).addClass('flash'));
	setTimeout(() => $('.tracks tr').removeClass('flash'), 1000);
	await background.execute('/unreads/clear');

})();

async function render() {
	let tracks = await background.execute<Track[]>('/tracks');
	$('.tracks').empty();
	for (let track of tracks) {
		$('.tracks').append(parseHtml(/* html */`
			<tr data-id="${track.trackingNumber}">
				*if(${!!track.carrier}){<td title="${track.carrier}"><img class="carrier-icon" src="/images/${track.carrier}.png"></td>}
				*if(${!track.carrier}){<td class="text-center"><i class="fa fa-question-circle"></i></td>}
				<td>${track.description || ''}</td>
				*if(${!!track.url}){<td><a href="${track.url}" target="_blank">${track.trackingNumber}</a></td>}
				*if(${!track.url}){<td>${track.trackingNumber}</td>}
				<td class="${track.status == 'Delivered' ? 'text-success' : ''}">${track.status || N_A()}</td>
				<td title="update count: ${track.updateCount}">${track.date ? formatDate(track.date) : N_A()}</td>
				<td>
					<div class="dropdown">
						<div class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-v"></i></div>
						<div class="dropdown-menu dropdown-menu-right">
							<div class="dropdown-item refresh-btn" data-id="${track.trackingNumber}"><i class="fa fa-refresh fa-fw mr-1"></i> Refresh</div>
							<div class="dropdown-item edit-btn" data-id="${track.trackingNumber}"><i class="fa fa-edit fa-fw mr-1"></i> Edit</div>
							<div class="dropdown-item delete-btn" data-id="${track.trackingNumber}"><i class="fa fa-trash fa-fw mr-1"></i> Delete</div>
							<div class="dropdown-item move-up-btn" data-id="${track.trackingNumber}"><i class="fa fa-level-up fa-fw mr-1"></i> Move up</div>
							<div class="dropdown-item move-down-btn" data-id="${track.trackingNumber}"><i class="fa fa-level-down fa-fw mr-1"></i> Move down</div>
						</div>
					</div>
				</td>
			</tr>
		`));
	}

	//hide/show no tracks message
	$('.no-tracks').toggleClass('d-none', !!tracks.length);

	await renderLoadingTracks();
}

async function renderLoadingTracks() {
	//add loading track classes
	let loadingTracks = await background.execute<string[]>('/loading');
	$(`.tracks tr`).removeClass('loading');
	loadingTracks.forEach(t => $(`.tracks tr[data-id='${t}'`).addClass('loading'));
}

chrome.runtime.onMessage.addListener((msg, sender, send) => {
	new Promise<void>(async resolve => {
		//loading
		if (msg.route == '/loading') {
			await renderLoadingTracks();
			resolve();
		}
	}).then(send)
	return true;
});


