import React, { useState } from "react";
import Select from "react-select";
import "./KeyMultiSelect.css";
import { camelCaseToReadable } from "../Table/Table";
export const getKeysFromFirstObject = (data) => {
  if (data.length === 0) return [];
  return Object.keys(data[0]).filter(
    (key) => key !== "name" && key !== "country" && key !== "id"
  );
};

const KeyMultiSelect = ({ data, selectedKeys, setSelectedKeys }) => {
  const uniqueKeys = getKeysFromFirstObject(data);

  const handleChange = (selectedOptions) => {
    setSelectedKeys(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const options = uniqueKeys.map((key) => ({
    value: key,
    label: camelCaseToReadable(key),
  }));

  return (
    <Select
      isMulti
      options={options}
      value={options.filter((option) => selectedKeys.includes(option.value))}
      onChange={handleChange}
      placeholder="Select Columns"
      className="key-multiselect"
    />
  );
};

export default KeyMultiSelect;
