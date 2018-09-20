import React from 'react'
import axios from 'axios'
import {Container, Header, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

class User extends React.Component {
	state = {user: {}, posts: [], body: ''}

	componentDidMount() {
		const userId = this.props.match.params.id

		axios.get(`/api/users/${userId}`)
			.then(res => this.setState({user: res.data}))

		axios.get(`/api/users/${userId}/posts`)
			.then(res => this.setState({posts: res.data}))
	}

	editBio = () => {
		if(this.props.currentUser.id === this.state.user.id) {
			return (
				<Button circular>Edit Bio</Button>
			)
		}
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const post = {body: this.state.body}
		axios.post(`/api/users/${this.props.currentUser.id}/posts`, {post})
			.then(res => this.setState({posts: [res.data, ...this.state.posts]}))
		this.setState({body: ''})
	}

	makePost = () => {
		if(this.props.currentUser.id === this.state.user.id) {
			return (
				<form onSubmit={this.handleSubmit}>
					<input
						name="body"
						required
						value={this.state.body}
						onChange={this.handleChange}
					/>
					<Button primary>Post</Button>
				</form>
			)
		}
	}

	showUser = () => {
		const {user, posts} = this.state
		return (
			<Container>
				<Header as="h1" textAlign="center">{user.nickname}</Header>
				<Header as="h3" textAlign="center">Bio:</Header>
				{this.editBio()}
				<Header as="h5" textAlign="center">{user.bio ? user.bio : 'This user does not have a bio yet.'}</Header>
				<Header as="h2" textAlign="center">Posts:</Header>
				{this.makePost()}
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

const mapStateToProps = (state) => {
	return {currentUser: state.user}
}

export default connect(mapStateToProps)(User)
