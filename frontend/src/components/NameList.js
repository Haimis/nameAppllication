import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Container,
  Fade, Row, Col, Table, NavLink,
  Input, Navbar, NavbarBrand,
} from 'reactstrap';
import gitHubMark from '../images/GitHub-Mark-32px.png';

const NameList = (props) => {
  const [names, setNames] = useState(props.names);
  const [value, setValue] = useState('');
  const [order, setOrder] = useState('name');
  const [showBtn, setShowBtn] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [highlight, setHighLight] = useState(false);

  const compare = (a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  let showNames = order === 'amount'
    ? names.sort((a, b) => b.amount - a.amount)
    : names.sort(compare);

  showNames = value === ''
    ? names
    : names.filter((n) => n.name.toLowerCase()
      .includes(value.toLocaleLowerCase()));

  const handleSearchChange = (event) => {
    setValue(event.target.value);
  };

  const total = showNames.reduce((sum, cur) => cur.amount + sum, 0);

  const addMikko = () => {
    const newNames = names.map((n) => {
      if (n.name === 'Mikko') {
        const newMikko = {
          ...n,
          amount: n.amount + 1,
        };

        return newMikko;
      }

      return n;
    });

    setShowBtn(false);
    setFadeIn(true);
    setHighLight(true);
    setTimeout(() => {
      setFadeIn(false);
    }, 10000);
    setTimeout(() => {
      setNames(newNames);
      setHighLight(false);
    }, 1000);
  };

  return (
    <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Name application</NavbarBrand>
      <NavLink href="https://github.com/Haimis/nameAppllication">
      <img src={gitHubMark} alt="Github link" />
      </NavLink>
      </Navbar>
        <Container>
        {fadeIn
          ? <div>
            <Fade in={fadeIn} tag="h5" className="mt-3">
              Great! One Mikko added but not permanently saved.
              Please get in touch so we can arrange an interview and fix this bug! ;)
            </Fade>
          </div>
          : ''
        }
        <Row>
          <Col xs="5">
            <Input placeholder="Search names" type="text"
            onChange={(val) => handleSearchChange(val)} />
          </Col>
        </Row>

      <ButtonGroup>
        <Button outline color="info" onClick={() => setOrder('name')}>
          Sort by name
        </Button>
        <Button outline color="info" onClick={() => setOrder('amount')}>
          Sort by amount
        </Button>
          {showBtn
            && <Button outline color="info" onClick={() => addMikko()}>
              I like this app, you are hired!
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
          {showNames.map((name) => (highlight
            && name.name === 'Mikko'
            ? <tr className="high" key={name.name}>
          <td>{name.name}</td>
          <td>
            {name.amount} +1

          </td>
        </tr>
            : <tr key={name.name}>
                <td>{name.name}</td>
                <td>{name.amount}</td>
              </tr>))}
        </thead>
      </Table>
      </Container>
    </div>
  );
};

export default NameList;

NameList.propTypes = {
  names: PropTypes.array,
};
