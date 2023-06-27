import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../configs/firebase';

interface Values {
  name: string;
  logo: string;
  address: string;
}



const addSupplierInfo = async () => {
  try {
    const docRef = await addDoc(collection(db, "suppliers"), {
      name: "Supplier 1",
    });
    console.log("Supplier written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const SupplierForm = () => {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          name: '',
          logo: '',
          address: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            addSupplierInfo()
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);

        }}
      >
        <Form>
          <label htmlFor="name">Supplier Name</label>
          <Field id="name" name="name" placeholder="Rundoo" />

          <label htmlFor="logo">Logo</label>
          <Field id="logo" name="logo" placeholder="Doe" />

          <label htmlFor="address">Address</label>
          <Field id="address" name="address" placeholder="N2S2L5"/>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};