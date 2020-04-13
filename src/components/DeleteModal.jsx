import React, { useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default class DeleteModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
    }
    

    toggleModal() {
        let show
        if(this.state.showModal) show = false
        else show = true

        this.setState({
            showModal: show
        })
    }

    render() {
        return(
            <div>

                <Modal
                    show={this.state.showModal}
                    onHide={() => this.handleOpenModal()}
                    dialogClassName=""
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Delete album?
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you sure you want to delete {}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" size="md">Confirm</Button>
                        <Button variant="primary" size="md" onClick={this.handleOpenModal}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }
}