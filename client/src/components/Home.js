import React, { Fragment } from 'react'
import { Header, List } from 'semantic-ui-react'
import axios from 'axios'

class Home extends React.Component {
  state = {users: []}

  componentDidMount() {
    axios.get('/api/users')
      .then(res => this.setState({users: res.data}))
  }

  clickUser = (id) => {
    this.props.history.push(`/users/${id}`)
  }

  render() {
    return (
      <Fragment>
        <Header as="h1">Users:</Header>
        <List bulleted>
        {this.state.users.map(user =>
          <List.Item key={user.id} onClick={() => this.clickUser(user.id)}>{user.nickname}</List.Item>
        )}
        </List>
      </Fragment>
    )
  }
}

export default Home
