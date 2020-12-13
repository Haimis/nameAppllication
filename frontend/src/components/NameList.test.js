import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import NameList from './NameList';

describe('NameList', () => {
  let component;

  beforeEach(() => {
    const names = [
      {
        name: 'Teppo Testaaja',
        amount: 2,
      },
      {
        name: 'Aino Ainoa',
        amount: 1,
      },
      {
        name: 'Mikko',
        amount: 5,
      },
    ];

    component = render(
      <NameList names={names} />,
    );
  });

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Teppo Testaaja');
    expect(component.container).toHaveTextContent('Aino Ainoa');
    expect(component.container).toHaveTextContent('Mikko');
    expect(component.container).toHaveTextContent('1');
    expect(component.container).toHaveTextContent('2');
    expect(component.container).toHaveTextContent('5');
  });

  test('sort by amount works', () => {
    const button = component.getByText('Sort by amount');
    fireEvent.click(button);
    const tableRows = component.getAllByRole('row');
    expect(tableRows[1]).toHaveTextContent('Mikko5');
    expect(tableRows[2]).toHaveTextContent('Teppo Testaaja2');
    expect(tableRows[3]).toHaveTextContent('Aino Ainoa1');
  });

  test('sort by name works', () => {
    const sortByAmountButton = component.getByText('Sort by amount');
    fireEvent.click(sortByAmountButton);
    const sortByNameButton = component.getByText('Sort by name');
    fireEvent.click(sortByNameButton);
    const tableRows = component.getAllByRole('row');
    expect(tableRows[1]).toHaveTextContent('Aino Ainoa1');
    expect(tableRows[2]).toHaveTextContent('Mikko5');
    expect(tableRows[3]).toHaveTextContent('Teppo Testaaja2');
  });

  test('you are hired button updates Mikko', () => {
    let tableRows = component.getAllByRole('row');
    expect(tableRows[2]).toHaveTextContent('Mikko5');
    const button = component.getByText('I like this app, you are hired!');
    fireEvent.click(button);
    tableRows = component.getAllByRole('row');
    expect(tableRows[2]).toHaveTextContent('Mikko5 +1');
  });

  test('total works', () => {
    const tableRows = component.getAllByRole('row');
    expect(tableRows[0]).toHaveTextContent('nameamount (8 total)');
  });

  test('filtering works', () => {
    let tableRows = component.getAllByRole('row');
    expect(tableRows[0]).toHaveTextContent('nameamount (8 total)');
    const textbox = component.getByRole('textbox');
    fireEvent.change(textbox, {
      target: { value: 'a' },
    });
    tableRows = component.getAllByRole('row');
    expect(tableRows.length).toBe(3);
    expect(tableRows[0]).toHaveTextContent('nameamount (3 total)');

    expect(component.container).toHaveTextContent('Teppo Testaaja', 1);
  });
});
