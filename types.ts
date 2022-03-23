interface Track {
	trackingNumber: string;
	description?: string;
	carrier?: string;
	url?: string;
	status?: string;
	date?: string;
	valid?: boolean;
	statusType?: StatusType;
	updateCount?: number;
}

type Carrier = 'Fedex' | 'UPS' | 'USPS';
type StatusType = 'Standard' | 'Delivered' | 'Exception';