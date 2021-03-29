import React from "react";
import {useParams} from "react-router-dom";

export default function TestParam() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
  
    return (
      <div>
        <h1>Testing Param for your Profile or Post: {id}</h1>
      </div>
    );
}