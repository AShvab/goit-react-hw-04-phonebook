import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import contactsData from '../data/data.json';
import Form from './Form';
import ContactList from './ContactList/ContactList';
import SearchContact from './SearchContact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Subtitle, Text, Title, Total } from './App.styled';

const App = () => {
 const [contacts, setContacts] = useState(contactsData);
 const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   const savedContacts = localStorage.getItem('contacts');
  //   if (savedContacts) {
  //     this.setState({ contacts: JSON.parse(savedContacts) });
  //   } else {
  //     this.setState({ contactsData });
  //   }
  // }



  // componentDidUpdate(_, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }


  const addContact = (contact) => {
    const { name } = contact;
    if (contacts.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      toast.warning(`${name} is already in contacts`);
      return;
    }
    const newContact = { ...contact, id: nanoid() };
    setContacts([...contacts, newContact]);
  };

  const removeContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const searchContact = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
    );
    };
  
    const filteredContacts = getFilteredContacts();

    return (
      <Container>
        <Title>PhoneBook</Title>
        <Form onSubmit={addContact} />
        <Subtitle>Contacts</Subtitle>
        <Total>Total contacts: {filteredContacts.length}</Total>
        <SearchContact searchContact={searchContact} />
        {filteredContacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            removeContact={removeContact}
          />
        ) : (
          <Text>Contact list is empty</Text>
        )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
  }



export default App;
