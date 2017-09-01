import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Header, Button, Icon, Input } from 'semantic-ui-react'

class AddRoomModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  render() {
    return (
      <Modal
        open={this.props.show}
        onClose={this.props.onClose}
        basic
        size="small"
      >
        <Header icon="archive" content="Create New Room" />
        <Modal.Content>
          <Input
            placeholder="Room Title"
            size="large"
            onChange={e => {
              this.setState({ title: e.target.value })
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={this.props.onClose}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              this.props.onSubmit(this.state)
            }}
          >
            <Icon name="checkmark" /> Create
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

AddRoomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default AddRoomModal
