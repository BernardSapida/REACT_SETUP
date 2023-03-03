import Form from "react-bootstrap/Form";
import React from "react";

function Input(props: any) {
  return (
    <>
      <Form.Group className="mb-3" controlId={props.name}>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.handler}
          isInvalid={props.isInvalid}
        />
        <Form.Control.Feedback type="invalid">
          {props.error}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default React.memo(Input);
