import React from 'react'
import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="">
            <Navbar.Brand href="/">Cool Albums</Navbar.Brand>
            <Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation