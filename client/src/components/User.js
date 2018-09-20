import React from 'react'
import axios from 'axios'
import {Container, Header} from 'semantic-ui-react'

class User extends React.Component {
	state = {user: {}, posts: []}

	componentDidMount() {
		const userId = this.props.match.params.id

		axios.get(`/api/users/${userId}`)
			.then(res => this.setState({user: res.data}))

		axios.get(`/api/users/${userId}/posts`)
			.then(res => this.setState({posts: res.data}))
	}

	showUser = () => {
		const {user, posts} = this.state
		return (
			<Container>
				<Header as="h1" textAlign="center">{user.nickname}</Header>
				<Header as="h3" textAlign="center">Bio:</Header>
				<Header as="h5" textAlign="center">{user.bio ? user.bio : 'This user does not have a bio yet.'}</Header>
				<Header as="h2" textAlign="center">Posts:</Header>
				<hr />
				{posts.map(post =>
					<div key={post.id}>
						<Header as="h5" textAlign="center">{post.body}</Header>
						<hr />
					</div>
				)}
			</Container>
		)
	}

	render() {
		const {user} = this.state
		if(user.id) {
			return(
				this.showUser()
			)
		} else {
			return <Header as="h1">User Not Found</Header>
		}
	}
}

export default User
