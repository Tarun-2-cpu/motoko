import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => { 
  
  const authClient = await AuthClient.create();

  if(await authClient.isAuthenticated()){
    handleAuthentication()
  }else{
    await authClient.login({
      identityProvier: "https://identity.ic0.app/#authorize",
      onSuccess: () =>{
        handleAuthentication();
        //2639451,
      }
    })
  }

  async function handleAuthentication(){
    ReactDOM.render(<App />, document.getElementById("root"));
  }
}



init();