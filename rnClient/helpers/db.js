import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS places (Id INTEGER PRIMARY KEY NOT NULL, Url TEXT NOT NULL, Description TEXT NOT NULL, DateAdded DATE NOT NULL, UserId TEXT NOT NULL);',
            [],
            () => {
              resolve();
            }, //if succeded
            (_, err) => {
                reject(err);
            } //if failed
          );
        });
  });
return promise;
};

export const insertPhoto = (Id, Url, Description, DateAdded, UserId) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO Photos (Id, Url, Description, DateAdded, UserId) VALUES (?, ?, ?, ?, ?);',
              [Id, Url, Description, DateAdded, UserId], //passing data into query
              (_, result) => { //1st argument is like repetition of query, second is result or error 
                resolve(result);
              }, //if succeded
              (_, err) => {
                  reject(err);
              } //if failed
            );
          });
    });
 return promise;
};

