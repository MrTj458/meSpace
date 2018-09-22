import React from 'react'
import { Card, Button } from 'semantic-ui-react'
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
      <Card.Group>
        {this.state.users.map(user =>
          <Card key={user.id}>
            <Card.Content>
              <Card.Header>{user.nickname}</Card.Header>
              <Card.Description>
                { user.bio ? user.bio : 'This user does not have a bio yet.' }
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => this.clickUser(user.id)}>View User</Button>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    )
  }
}

export default Home
