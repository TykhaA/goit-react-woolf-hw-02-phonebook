import Form from './Form/Form';
import { useState, useEffect } from 'react';
import ListContacts from './ListContacts/ListContacts';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const handleChange = (value, number) => {
    const obj = {
      name: value,
      id: nanoid(),
      number: number,
    };
    const dublicate = filterByName(value);
    if (dublicate.length > 0) {
      alert(`${value} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, obj]);
    }
  };

  const handleFiter = ({ target: { value } }) => {
    setFilter(value);
  };

  const filterByName = value => {
    return contacts.filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  };

  const hendleDelete = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
  };

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    const localdata = localStorage.getItem('contacts');
    if (localdata) {
      setContacts(JSON.parse(localdata));
    }
  }, []);

  // const componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts.length !== this.state.contacts.length) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }
  // componentDidMount() {
  //   const localdata = localStorage.getItem('contacts');
  //   if (localdata) {
  //     this.setState({ contacts: JSON.parse(localdata) });
  //   }
  // }

  const filterContact = filterByName(filter);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#010101',
        width: 400,
        margin: 'auto',
      }}
    >
      <Section title="Phonebook">
        <Form handleChange={handleChange} />
      </Section>
      <Section title="Contacts">
        <Filter handleFiter={handleFiter} />
        <ListContacts contacts={filterContact} hendleDelete={hendleDelete} />
      </Section>
    </div>
  );
};
export default App;
