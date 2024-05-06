import Form from './Form/Form';
import { Component } from 'react';
import ListContacts from './ListContacts/ListContacts';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChange = (value, number) => {
    const obj = {
      name: value,
      id: nanoid(),
      number: number,
    };
    const dublicate = this.filterByName(value);
    if (dublicate.length > 0) {
      alert(`${value} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, obj],
      }));
    }
  };

  handleFiter = ({ target: { value } }) => {
    this.setState(() => ({
      filter: value,
    }));
  };

  filterByName = value => {
    return this.state.contacts.filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  };

  hendleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const localdata = localStorage.getItem('contacts');
    if (localdata) {
      this.setState({ contacts: JSON.parse(localdata) });
    }
  }

  render() {
    const filterContact = this.filterByName(this.state.filter);
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
          <Form handleChange={this.handleChange} />
        </Section>
        <Section title="Contacts">
          <Filter handleFiter={this.handleFiter} />
          <ListContacts
            contacts={filterContact}
            hendleDelete={this.hendleDelete}
          />
        </Section>
      </div>
    );
  }
}
export default App;
