import React from 'react';
import styles from './Table.module.css'

const Table: React.FC<{ data: any[]; columns: any[];actions:any[] }> = ({ data, columns,actions=[] }) => {
  return (
    <table className={styles.mytable}>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column}>{column.replace(/_/g,' ')}</th>
          ))}
          {actions.length > 0 && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map(column => (
              <td key={column}>{row[column]}</td>
            ))}
            {actions.length > 0 && (
              <td className={styles.actiongroup}>
                {actions.map((action, actionIndex) => (
                  <div key={actionIndex}>{action}</div>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
