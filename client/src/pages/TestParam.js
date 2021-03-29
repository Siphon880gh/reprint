/**
 * @file TestParam
 * 
 * This component will receive the param in the URL and display it.
 * TODO: We can use this component as a basis to get a specific profile at /profile/:id or post at /post/:id
 *       by combining useParams with useQuery or useMutation and with UseEffect on [].
 * 
 */ 
import React from "react";
import {useParams} from "react-router-dom";

// Styling
import "./TestParam.css";

export default function TestParam() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
  
    return (
      <div>
        <h1>Param for your Profile or Post from the URL is: <span className="text-green">{id}</span></h1>
        <h2>This test passes if the <span className="text-green">ID number</span> matches the number ending in the URL.</h2>
      </div>
    );
}