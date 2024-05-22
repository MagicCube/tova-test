'use client';

import cn from 'classnames';
import { useCallback, useState } from 'react';

import * as config from '~/config';

import Confetti from '../confetti';
import DotMatrix from '../dot-matrix';
import * as store from '../../store';
import { useStore } from '../../store';

import styles from './index.module.css';

export default function Main() {
  const snapshot = useStore();
  const [selected, setSelected] = useState<number | null>(null);
  const handleButtonClick = useCallback(
    ({ target }: React.MouseEvent) => {
      if (snapshot.status === 'win') {
        return;
      }
      const button = target as HTMLButtonElement;
      const value = parseInt(button.innerText, 10);
      store.select(value);
      setSelected(value);
      setTimeout(() => {
        setSelected(null);
      }, 2000);
    },
    [snapshot.status]
  );
  return (
    <div>
      {['win', 'corrected'].includes(snapshot.status) && (
        <Confetti amount={snapshot.status === 'win' ? 200 : 50} />
      )}
      <div className={styles.row1}>
        <DotMatrix
          columns={config.columns}
          rows={config.rows}
          data={snapshot.data}
        />
      </div>
      <hr />
      <div className={styles.row2}>
        <DotMatrix
          columns={config.columns}
          rows={config.rows}
          data={snapshot.interferenceData}
        />
      </div>
      <hr />
      <div className={styles.buttons}>
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            className={cn(
              styles.button,
              snapshot.status === 'lose' && selected === i && styles.shaking
            )}
            onClick={handleButtonClick}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
