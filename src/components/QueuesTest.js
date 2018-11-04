import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Dialog, FlatButton, TextField, FloatingActionButton} from 'material-ui';
import User from './User'
import {ContentAddIcon} from './Icons';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import QueuesDatabase from '../services/QueuesDatabase';

const fabStyle = {
	position: 'fixed',
	bottom: '20px',
	right: '20px'
};

class Queues extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: Queues.database().data(),
			dialog: false
		};
	}

	static database() {
		 return QueuesDatabase(firebaseConfig);
	}

	componentDidMount() {
		Queues.database().get()
			.then(queues => this.setState({queues}))
			.catch(err => {
			  console.log(err);
		  });
	}

	shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.match.params.id || nextProps.match.params.id !== this.props.match.params.id;
	}

	handleOpenDialog = () => this.setState({dialog: true})

	handleCloseDialog = () => this.setState({dialog: false})

	handleSubmit = () => {
		const queue = {
			ta: this.nameText.getValue(),
			closed: false
		};

		if (!queue.ta) {
			this.handleCloseDialog();
			return;
		}

		Queues.database().post(queue).then(queues => {
			this.setState({
				queues: Queues.database().data(),
				dialog: false
			});
		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		const queues = () => {
			if (!this.state.queues) {
				return;
			}

      if (this.props.match.params.id) {
        return (
          <User user={this.state.queues[this.props.match.params.id]}/>
				);
      }

			return Object.keys(this.state.queues).map(id => {
				return (
					<Link key={id} to={`/queues/${id}`}>
						<User user={this.state.queues[id]}/>
					</Link>
				);
			});
		};
		return (
			<div>
				<Card style={{marginBottom: '0.3em'}}>
					<CardTitle title="TA's queue"/>
					<CardText>
						Create new queue
					</CardText>
				</Card>
				{queues()}
				<FloatingActionButton style={fabStyle} onTouchTap={this.handleOpenDialog}>
					<ContentAddIcon/>
				</FloatingActionButton>
				<Dialog
					title="Starting new Queue"
					actions={<FlatButton label="Submit" primary={true} onTouchTap={this.handleSubmit}/>}
					modal={false}
					open={this.state.dialog}
					onRequestClose={this.handleCloseDialog}
				>
					<div>
						Input TA's name.
					</div>
					<TextField hintText="TA Name" name="name" ref={ref => this.nameText = ref}/>
				</Dialog>
			</div>
		);
	}
}

Queues.propTypes = {
	params: React.PropTypes.object
};

export default Queues;
