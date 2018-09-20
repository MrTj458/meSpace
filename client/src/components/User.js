import React from 'react'
import axios from 'axios'

class User extends React.Component {
	state = {user: {}}

	componentDidMount() {
		axios.get(`/api/users/${this.props.match.params.id}`)
			.then(res => this.setState({user: res.data}))
	}

	render() {
		const {user} = this.state
		return (
			<p>{user.nickname}</p>
		)
	}
}

export default User
