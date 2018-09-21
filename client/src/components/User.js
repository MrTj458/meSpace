import React from 'react'
import axios from 'axios'
import {Container, Header, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'

class User extends React.Component {
	state = {user: {}, posts: [], body: '', bio: '', editing: false}

	componentDidMount() {
		this.getUserAndPosts()
	}

	componentDidUpdate(prevProps) {
		if(prevProps.match.params.id !== this.props.match.params.id) {
			this.getUserAndPosts()
		}
	}

	getUserAndPosts = () => {
		const userId = this.props.match.params.id

		axios.get(`/api/users/${userId}`)
			.then(res => this.setState({ user: res.data }))

		axios.get(`/api/users/${userId}/posts`)
			.then(res => this.setState({ posts: res.data }))
	}

	handleBioSubmit = (e) => {
		e.preventDefault()
		const updatedUser = {bio: this.state.bio}
		axios.put(`/api/users/${this.props.currentUser.id}`, {user: updatedUser})
			.then(res =>
				this.setState({user: res.data})
			)
		this.setState({bio: '', editing: false})
	}

	swapEditing = () => {
		this.setState({editing: !this.state.editing})
	}

	editingBio = () => {
		if(this.state.editing) {
			return (
				<form onSubmit={this.handleBioSubmit}>
					<input
						name="bio"
						required
						placeholder="Bio"
						value={this.state.bio}
						onChange={this.handleChange}
					/>
					<Button>Save</Button>
				</form>
			)
		}
	}

	editBio = () => {
		if(this.props.currentUser.id === this.state.user.id) {
			return (
				<Button circular onClick={this.swapEditing}>Edit Bio</Button>
			)
		}
	}

	handleChange = (e) => {
		const {name, value} = e.target
		this.setState({[name]: value})
	}

	handlePostSubmit = (e) => {
		e.preventDefault()
		const post = {body: this.state.body}
		axios.post(`/api/users/${this.props.currentUser.id}/posts`, {post})
			.then(res => this.setState({posts: [res.data, ...this.state.posts]}))
		this.setState({body: ''})
	}

	makePost = () => {
		if(this.props.currentUser.id === this.state.user.id) {
			return (
				<form onSubmit={this.handlePostSubmit}>
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
				{this.editingBio()}
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
