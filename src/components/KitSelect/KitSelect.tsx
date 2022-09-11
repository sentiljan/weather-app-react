import { Select } from "antd";
import React from "react";
import { tCountry } from "../../views/types";

interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
  arr: tCountry[];
  disabled?: boolean;
  key?: number;
}

export const KitSelect = ({
  defaultValue,
  onChange,
  disabled,
  arr,
  key,
}: Props): JSX.Element => {
  const { Option } = Select;

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 150 }}
      onChange={onChange}
    >
      {arr.map((c) => (
        <Option key={c.area} disabled={disabled} value={c.name.common}>
          {c.name.common}
        </Option>
      ))}
    </Select>
  );
};
