const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json")

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const contact = await listContacts();
    const normalId = String(contactId)
    const result = contact.find(item => item.id === normalId);
    return result || null;
};

const removeContact = async (contactId) => {
    const contact = await listContacts();
    const normalId = String(contactId)
    const index = contact.findIndex(item => item.id === normalId);
    if (index === -1) { 
        return null;
    };
    const [result] = contact.splice(index, 1);
    return result;
};

const addContact = async ({name, email, phone}) =>  {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};