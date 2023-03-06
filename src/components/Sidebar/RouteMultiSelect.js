import React from "react";
import Select from "react-select";
import { ROUTES } from "../../lib/Api";

const RouteMultiSelect = ({ selectedRouteIds }) => {
  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      defaultValue={
        selectedRouteIds.length > 0 &&
        ROUTES.filter((route) => selectedRouteIds.includes(route.id)).map(
          ({ id, name }) => ({
            value: id,
            label: [id, name].join(" "),
          })
        )
      }
      options={ROUTES.map(({ id, name }) => ({
        value: id,
        label: [id, name].join(" "),
      }))}
      onChange={(newValues) =>
        (window.location = `/?routes=${newValues.map(({ value }) => value)}`)
      }
    />
  );
};

export default RouteMultiSelect;
