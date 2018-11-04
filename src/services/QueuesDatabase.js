class QueuesDatabase {
	constructor(opts) {
		this.databaseURL = opts.databaseURL;
		this.queues = {};
	}

	data = (id) => id ? this.queues[id] : this.queues;

	get = () => {
		return fetch(`${this.databaseURL}/queues.json/`).then(res => {
			if (res.status !== 200) {
				throw new Error(res.statusText);
			}

			return res.json().then(queues => this.queues = queues);
		});
	}

	post = (queue = {}) => {
		return fetch(`${this.databaseURL}/queues.json`, {
			method: 'POST',
			body: JSON.stringify(queue)
		}).then(res => {
			if (res.status !== 200) {
				throw new Error(res.statusText);
			}

			return res.json().then(data => {
				this.queues[data.ta] = queue;
				return this.queues;
			});
		});
	}
}

let queuesDatabaseSingleton = null;

export default function (opts) {
	if (!queuesDatabaseSingleton) {
		queuesDatabaseSingleton = new QueuesDatabase(opts);
	}

	return queuesDatabaseSingleton;
}