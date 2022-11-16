import { openDB } from 'idb';

// create a function that can be used to start up the database
const initdb = async () =>
// create a database named jate and we will use version 1
  openDB('jate', 1, {
    // sets the database schema if it isn't already defined 
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // create an object sore for our data inside of the 'jate'
      // we create a key named 'id' which will automatically be incremented for us
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// TODO: Add logic to a method that accepts some content and adds it to the database

// export a function we will use to PUT to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // connect to database and version we are using
  const textDb = await openDB('text', 1);

  // new transaction being made, specify the database and data priviledges 
  const tx = textDb.transaction('text', 'readwrite');

  // open up the desired object store
  const store = tx.objectStore('text');

  // use .put() method to pass in content
  const request = store.put({ text: content });

  // get confirmation of the request
  const result = await request; console.log('data has been saved to the database', result)
};

// TODO: Add logic for a method that gets all the content from the databse

// export a function we will use to GET all from the database.
export const getDb = async () => {
  console.log('GET data from the database');
  
  // connect to the database and version we are using
  const todosDb = await openDB('text', 1);
  
  // new transaction being made, specify the database we are posting to the data of "readonly"
  const tx = todosDb.transaction('text', 'readonly');
  
  // open object store
  const store = tx.objectStore('text');
  
  // use .getAll() method to grab all the content in the database
  const request = store.getAll();
  
  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);

};

// start the database
initdb();