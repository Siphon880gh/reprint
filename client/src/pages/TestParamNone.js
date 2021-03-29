/**
 * @file TestParam
 * 
 * This component will load for test-param/me in place of test-param/:id.
 * TODO: We can use this component as a basis for /profile/me which is visiting your own profile to edit it. Look into TestParam.js for more information
 * 
 */ 
import React from "react";
import {useParams} from "react-router-dom";

export default function TestParam() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
  
    return (
      <div>
        <h2>This test passes if the URL ends in /me and not a number.</h2>
      </div>
    );
}