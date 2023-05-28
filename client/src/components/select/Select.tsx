import React, { ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

interface ISelectProps {
  options: Option[];
  value: string;
  onChange: (selectedValue: string) => void;
}

const Select = ({ options, value, onChange }: ISelectProps) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  const renderMenu = () => (
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  );
  return (
    <div className="select-custom">
      <div className="select-wrapper">
        <div className="select-value"></div>
        <div>{renderMenu()}</div>
      </div>
    </div>
  );
};

export default Select;
