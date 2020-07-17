import React from 'react';
import Select from 'react-select';
import _ from 'lodash';
import { ValueType } from 'react-select/src/types';

const Filters = ({
  layers,
  setLayers,
}: {
  layers: { [k in string]: boolean };
  setLayers: (val: { [k in string]: boolean }) => void;
  layers: { [k: string]: boolean };
  setLayers: (val: { [k: string]: boolean }) => void;
}) => {
  const selectOptions = _.map(layers, (layer, key) => ({
    value: key,
    label: key,
  }));

  function handleLayer(
    event: Array<{ value: string; label: string }> | null | undefined,
  ) {
    if (Array.isArray(event) && event.length === 0) event = null;
    const selectedLayers = _.map(event, layer => layer.label);
    const newLayers: { [x: string]: boolean } = {};
    _.forEach(selectOptions, option => {
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
      />
    </div>
  );
};

export default Filters;
