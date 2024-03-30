import React from "react";

const TableRow = ({ rowContent }) => {
  return (
    <tr>
      {rowContent.map((val, rowID) => (
        <td key={rowID}>{val}</td>
      ))}
    </tr>
  );
};

export default TableRow;