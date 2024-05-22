'use client';

import cn from 'classnames';

import { type Item } from '~/types';

import styles from './index.module.css';

export default function DotMatrix({
  className,
  columns = 6,
  rows = 3,
  data,
}: {
  className?: string;
  maxCount?: number;
  columns?: number;
  rows?: number;
  data: Item[];
}) {
  return (
    <table className={cn(styles.container, className)}>
      <tbody>
        {Array.from({ length: rows }).map((_, row) => (
          <tr key={row}>
            {Array.from({ length: columns }).map((_, col) => {
              const hit = data.some(([x, y]) => x === col && y === row);
              return (
                <td key={col}>
                  <div className={styles.dotContainer}>
                    <div className={cn(styles.dot, hit && styles.red)}></div>
                  </div>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
