import React, { useState } from "react"
import axios from 'axios'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


export default class AlbumTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albumList: [],
            showAddModal: false,
            showDeleteModal: false,
            showEditModal: false,

            tableHeaderStyle: {
                "padding-left" : "0px"
            },

            albumFocus: {
                id: "",
                artist: "",
                title: "",
                genre: "",
                year: "",
                image: ""
            },

        }
    }

    setListDatafromServer() {
        axios.get('api/data')
            .then((response) => {
                this.setState({
                    albumList: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.currentEditAlbum = {
            id: "",
            artist: "",
            title: "",
            genre: "",
            year: "",
            image: "",
        }

        this.currentAddAlbum = {
            artist: "",
            title: "",
            genre: "",
            year: "",
            image: "",
        }

        this.setListDatafromServer()
    }

    AddAlbum() {
        if (this.currentAddAlbum.artist.value === "" ||
            this.currentAddAlbum.title.value  === "" ||
            this.currentAddAlbum.genre.value  === "" ||
            this.currentAddAlbum.year.value   === "" ||
            this.currentAddAlbum.image.value  === "" )
            {
            console.log('Invalid')
        }
        else {
            const newAlbum = {
                artist: this.currentAddAlbum.artist.value,
                title: this.currentAddAlbum.title.value,
                genre: this.currentAddAlbum.genre.value,
                year: this.currentAddAlbum.year.value,
                img: this.currentAddAlbum.image.value
            }

            axios.post(`api/data`, newAlbum)
            .then((response) => {
                console.log(response)
                if(response.data.status === 'OK') {
                    this.setListDatafromServer()
                    this.toggleAddModal()
                }
            })
            .catch((error) => {
                console.log(error)
            })

        }

    }

    deleteAlbum(id) {
        axios.delete(`api/data/${id}`)
            .then((response) => {
                let newArray = this.state.albumList

                if(response.data.status === 'OK') {
                    newArray = this.state.albumList.filter(album => album._id !== id)
                    this.setState ({
                        albumList: newArray
                    })
                }
            })
            .then(() => {
                this.setState({
                    showDeleteModal: false
                })
            })
            .catch((error) => {
            })
    }

    updateAlbum() {
        const currentId = this.state.albumFocus.id

        const editedAlbum = {
            artist: this.currentEditAlbum.artist.value,
            title: this.currentEditAlbum.title.value,
            genre: this.currentEditAlbum.genre.value,
            year: this.currentEditAlbum.year.value,
            img: this.currentEditAlbum.image.value
        }

        console.log(editedAlbum)

        axios.put(`/api/data/${currentId}`, editedAlbum )
        .then(res => {
            if(res.data.status === 'OK') {
                this.setListDatafromServer()
                this.toggleEditModal()
            }
        })
        .catch(err => console.log(err))
    }

    toggleDeleteModal(album) {
        let show
        if(this.state.showDeleteModal) show = false
        else {
            show = true
            this.getAlbumFocus(album)
        }

        this.setState({
            showDeleteModal: show,
        })
    }

    toggleEditModal(album) {
        let show
        if(this.state.showEditModal) show = false
        else {
            show = true
            this.getAlbumFocus(album)
        }

        this.setState({
            showEditModal: show,
        })
    }

    toggleAddModal() {
        let show
        if(this.state.showAddModal) show = false
        else show = true

        this.setState({
            showAddModal: show
        })

    }

    getAlbumFocus(album) {
        this.setState({
            albumFocus: {
                id: album._id,
                artist: album.artist,
                title: album.name,
                genre: album.genre,
                year: album.year,
                image: album.img
            }

        })
    }

    render() {
        const result = this.state.albumList.map((album) => 
            <tr className="custom-table" key={album.name}>
                <td className=""><img src={album.img} className="table-img"></img></td>
                <td>{album.artist}</td>
                <td>{album.name}</td>
                <td>{album.genre}</td>
                <td>{album.year}</td>
                <td>
                    <ButtonGroup className="manage-button-div" aria-label="Button Group">
                        <Button variant="primary" size="sm" onClick={() => this.toggleEditModal(album)}>
                            <svg className="bi bi-wrench" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M.102 2.223A3.004 3.004 0 003.78 5.897l6.341 6.252A3.003 3.003 0 0013 16a3 3 0 10-.851-5.878L5.897 3.781A3.004 3.004 0 002.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019L13 11l-.471.242-.529.026-.287.445-.445.287-.026.529L11 13l.242.471.026.529.445.287.287.445.529.026L13 15l.471-.242.529-.026.287-.445.445-.287.026-.529L15 13l-.242-.471-.026-.529-.445-.287-.287-.445-.529-.026z" clipRule="evenodd"/>
                            </svg>
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => this.toggleDeleteModal(album)}>
                            <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd" />
                            </svg>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        )
        
        return (
            <div>

                {/* Add */}
                <Modal
                    show={this.state.showAddModal}
                    onHide={() => this.toggleAddModal()}
                    dialogClassName=""
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Add Album
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Band/Aritst</Form.Label>
                                <Form.Control ref={node => this.currentAddAlbum.artist = node} type="text"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control ref={node => this.currentAddAlbum.title = node} type="text"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Genre</Form.Label>
                                <Form.Control ref={node => this.currentAddAlbum.genre = node} type="text"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Year</Form.Label>
                                <Form.Control ref={node => this.currentAddAlbum.year = node} type="text"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control ref={node => this.currentAddAlbum.image = node} type="text" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" size="md" onClick={() => this.AddAlbum()}>Add</Button>
                        <Button variant="primary" size="md" onClick={() => this.toggleAddModal()}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete */}
                <Modal
                    show={this.state.showDeleteModal}
                    onHide={() => this.toggleDeleteModal()}
                    dialogClassName=""
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Delete album?
                    </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Are you sure you want to delete {this.state.albumFocus.title} by {this.state.albumFocus.artist}?
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" size="md" onClick={() => this.deleteAlbum(this.state.albumFocus.id)}>Confirm</Button>
                        <Button variant="primary" size="md" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit */}
                <Modal
                    show={this.state.showEditModal}
                    onHide={() => this.toggleEditModal()}
                    dialogClassName=""
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Edit Album
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formArtist">
                                <Form.Label>Band/Aritst</Form.Label>
                                <Form.Control ref={node => this.currentEditAlbum.artist = node} type="text" defaultValue={this.state.albumFocus.artist} />
                            </Form.Group>

                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control ref={node => this.currentEditAlbum.title = node} type="text" defaultValue={this.state.albumFocus.title}/>
                            </Form.Group>

                            <Form.Group controlId="formGenre">
                                <Form.Label>Genre</Form.Label>
                                <Form.Control ref={node => this.currentEditAlbum.genre = node} type="text" defaultValue={this.state.albumFocus.genre} />
                            </Form.Group>

                            <Form.Group controlId="formYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control ref={node => this.currentEditAlbum.year = node} type="text" defaultValue={this.state.albumFocus.year}/>
                            </Form.Group>

                            <Form.Group controlId="formImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control ref={node => this.currentEditAlbum.image = node} type="text" defaultValue={this.state.albumFocus.image} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" size="md" onClick={() => this.updateAlbum(this.state.albumFocus)}>Update</Button>
                        <Button variant="primary" size="md" onClick={() => this.toggleEditModal()}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <div className="add-button-div">
                    <Button variant="primary" onClick={() => this.toggleAddModal()}>Add Album</Button>
                </div>


                <Table hover>
                    <thead>
                        <tr>
                            <th style={this.state.tableHeaderStyle}></th>
                            <th style={this.state.tableHeaderStyle}>Artist/Band</th>
                            <th style={this.state.tableHeaderStyle}>Title</th>
                            <th style={this.state.tableHeaderStyle}>Genre</th>
                            <th style={this.state.tableHeaderStyle}>Year</th>
                            <th style={this.state.tableHeaderStyle}></th>
                        </tr>
                    </thead>
                    <tbody>
                        { result }
                    </tbody>
                </Table>
            </div>
        )
    }
}