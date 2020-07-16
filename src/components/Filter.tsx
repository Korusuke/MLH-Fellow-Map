import React from 'react';
import Select from 'react-select';
import _ from 'lodash';

const Filters = ({ layers, setLayers }) => {
  const selectOptions = _.map(layers, (layer, key) => ({
    value: key,
    label: key,
  }));

  function handleLayer(event: any) {
    const selectedLayers = _.map(event, (layer) => layer.label);
    const newLayers: { [x: string]: boolean } = {};
    _.forEach(selectOptions, (option) => {
      newLayers[option.label] = event
        ? _.includes(selectedLayers, option.label)
        : true;
    });
    setLayers(newLayers);
  }

  return (
    <div className="filter">
      <Select
        onChange={handleLayer}
        options={selectOptions}
        isMulti
        closeMenuOnSelect={false}
      ></Select>
    </div>
  );
};

export default Filters;
