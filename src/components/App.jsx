import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import contacts from '../data/data.json';
import Form from './Form';
import ContactList from './ContactList/ContactList';
import SearchContact from './SearchContact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Subtitle, Text, Title, Total } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    } else {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    const { name } = contact;
    const { contacts } = this.state;

    if (contacts.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`${name} is already in contacts`);
      return;
    }
    const newContact = { ...contact };
    newContact.id = nanoid();
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  removeContact = (removeId) =>
    this.setState(({ contacts }) => ({
      contacts: [...contacts].filter(({ id }) => id !== removeId),
    }));


  searchContact = (event) => {
    const { value } = event.target;
    this.setState({ filter: value });
  };


  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <Container>
        <Title>PhoneBook</Title>
        <Form onSubmit={this.addContact} />
        <Subtitle>Contacts</Subtitle>
        <Total>Total contacts: {filteredContacts.length}</Total>
        <SearchContact searchContact={this.searchContact} />
        {filteredContacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            removeContact={this.removeContact}
          />
        ) : (
          <Text>Contact list is empty</Text>
        )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }
}

export default App;


