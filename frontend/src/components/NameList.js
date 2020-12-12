import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Fade, Row, Col, Table, Input, Navbar, NavbarBrand } from 'reactstrap';

const NameList = (props) => {
    const [names, setNames] = useState(props.names)
    const [value, setValue] = useState('')
    const [order, setOrder] = useState('name')
    const [showBtn, setShowBtn] = useState(true)
    const [fadeIn, setFadeIn] = useState(false);




    const compare = (a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    }

    let showNames = order === 'amount'
    ? names.sort((a,b) => b.amount - a.amount)
    : names.sort(compare)

    showNames = value === ''
    ? names
    : names.filter(n => n.name.toLowerCase()
      .includes(value.toLocaleLowerCase()))

    const handleSearchChange = (event) => {
      setValue(event.target.value)
    }

    const total = showNames.reduce((total, obj) => obj.amount + total,0)

    const addMikko = () => {
      const newNames = names.map((n) => {
        if (n.name === 'Mikko') {
          const newMikko = {
            ...n,
            amount: n.amount+1
          }

          return newMikko
        }

        return n
      })

      setShowBtn(false)
      setFadeIn(true)
      setTimeout(() => {
        setFadeIn(false) 
      }, 10000)
      setTimeout(() => {
        setNames(newNames)    
      }, 3000)
    }




    return (
      <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Name application</NavbarBrand>
        </Navbar>
          <Container>
          {fadeIn ?
          <div>
            <Fade in={fadeIn} tag="h5" className="mt-3">
                Thank you so much, I'm glad to join you as Solitas 20th Mikko! 
                Unfotunately I'll disapear when you refresh the page.
                If you think this is a bug, please get in touch and let's fix it!
            </Fade>
        </div>
        : '' }
          <Row>
        <Col xs="4">
        <Input placeholder="Search names" type="text" 
          onChange={(value) => handleSearchChange(value)} />         
        </Col>
      </Row>


        <ButtonGroup>
        <Button outline color="info" onClick={() => setOrder('name')}>
                    Sort by name
                  </Button>
                  <Button outline color="info" onClick={() => setOrder('amount')}>
                      Sort by amount
                    </Button>
                    {showBtn &&
          <Button outline color="info" onClick={() => addMikko()}>
            I like this app, you're hired!
          </Button>
        }

            </ButtonGroup>
          <Table size="sm" responsive>
          <thead>
              <tr>
                <th>
                name
                </th>
                <th>
                amount ({total} total)
                </th>
              </tr>
              {showNames.map(name =>
              fadeIn && name.name === 'Mikko' ? 
              <tr class="high" key={name.name}>
              <td>{name.name}</td>
              <td>
                {name.amount} +1
    
              </td>
            </tr>              
              :
                <tr key={name.name}>
                  <td>{name.name}</td>
                  <td>{name.amount}</td>
                </tr>
            )}
          </thead>
        </Table>
        </Container>
      </div>
    )
}

export default NameList