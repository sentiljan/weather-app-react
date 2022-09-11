import { Card } from "antd";
import React, { ReactNode } from "react";
import "./KitTiles.style.scss";

interface Props {
  title: string;
  width?: number;
  children: ReactNode;
  loading?: boolean;
  size?: "default" | "small";
  bordered?: boolean;
}

export const KitTiles = ({
  title,
  width,
  children,
  loading,
  size,
  bordered = false,
}: Props): JSX.Element => {
  return (
    <Card
      title={title}
      style={{ width: width }}
      size={size}
      bordered={bordered}
      loading={loading}
      className="kit-tile"
    >
      {children}
    </Card>
  );
};
