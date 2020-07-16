import React, { ReactElement } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

const Filters = ({ layers, setLayers }) => {
  const y = [];
  Object.keys(layers).map(function (key, index) {
    y.push(
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            checked={layers[key]}
            name={key}
            onChange={handleLayer}
          />{' '}
          {key}
        </Label>
      </FormGroup>,
    );
  });

  function handleLayer(event: { target: { name: string; checked: boolean } }) {
    const keyx = event.target.name;
    const newLayers = { ...layers };
    newLayers[keyx] = event.target.checked;
    setLayers(newLayers);
  }

  return (
    <div id="filters">
      <Form>{y}</Form>
    </div>
  );
};

export default Filters;
