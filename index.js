const contacts = require("./contacts");
const argv = require("yargs").argv;

 async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
          const contactsList = await contacts.listContacts();
          console.log(contactsList);
          break;

      case "get":
          const contact = await contacts.getContactById(id);
          console.log(contact);
          break;

    case "add":
      const newcontact = await contacts.addContact({name, email, phone});
          console.log(newcontact);
      break;

    case "remove":
          const removeContact = await contacts.removeContact(id);
          console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
     };
};
    
invokeAction(argv);