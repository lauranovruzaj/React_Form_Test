import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";
import { useField } from "formik";

export function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  // value is an array now
  const onChange = (value) => {
    setValue(value);
  };

  // use value to make this a  controlled component
  // now when the form receives a value for 'campfeatures' it will populate as expected
  return <Select {...props} onChange={onChange} onBlur={setTouched} />;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Name can only contain letters."
    )
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Last name can only contain letters."
    )
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Please enter a valid email").required("Required"),
  hobbies: Yup.array().of(
    Yup.object({
      value: Yup.string().required("Required!"),
      label: Yup.string().required("Required!"),
    })
  ),
});

const options = [
  { value: "hobbie1", label: "hobbie1" },
  { value: "hobbie2", label: "hobbie2" },
  { value: "hobbie3", label: "hobbie3" },
];

export const ValidationSchemaExample = (props) => (
  <div>
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        hobbies: [],
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        props.onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Stack gap={2}>
            <Field
              as="select"
              name="hobbies"
              isMulti
              component={SelectField}
              options={options}
            />
            {errors.hobbies && touched.hobbies ? (
              <Alert variant="danger">{errors.hobbies}</Alert>
            ) : null}
            <Field name="firstName" placeholder="Enter your name" />
            {errors.firstName && touched.firstName ? (
              <Alert variant="danger">{errors.firstName}</Alert>
            ) : null}
            <Field name="lastName" placeholder="Enter your last name" />
            {errors.lastName && touched.lastName ? (
              <Alert variant="danger">{errors.lastName}</Alert>
            ) : null}
            <Field name="email" type="email" placeholder="Enter your email" />
            {errors.email && touched.email ? (
              <Alert variant="danger">{errors.email}</Alert>
            ) : null}
            <Button variant="primary" type="submit">
              Primary
            </Button>{" "}
          </Stack>
        </Form>
      )}
    </Formik>
  </div>
);
