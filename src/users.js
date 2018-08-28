import React, { Component } from 'react';

function Users() {
return [
  {
    id: "zamarawka",
    name: "Sereja",
    location: "MSK, Planet Earth.",
    accountData: {
      posts: "42",
      followers: "77",
      following: "113"
    }
  },
  {
    id: "id_angie",
    name: "Angelina",
    location: "",
    accountData: {
      posts: "240",
      followers: "76",
      following: "101"
    }
  }
];
}

export default Users;