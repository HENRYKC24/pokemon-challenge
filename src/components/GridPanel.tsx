import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

interface GridPanelProps {
  children: ReactNode;
  minimumChildWidth: number;
  maxColumns: number;
}

const GridPanel: React.FC<GridPanelProps> = ({
  children,
  minimumChildWidth,
  maxColumns,
}): JSX.Element => {
  const [state, setState] = useState({
    columns: 1,
    style: {
      display: 'grid',
      width: '100%',
      flex: 1,
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
    },
  });
  const { width } = useWindowSize();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let columns = panel.current?.clientWidth
      ? Math.floor(panel.current.clientWidth / minimumChildWidth)
      : 0;
    if (maxColumns && columns > maxColumns) {
      columns = maxColumns;
    }
    setState((prevState) => ({
      ...prevState,
      columns,
      style: {
        ...prevState.style,
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      },
    }));
  }, [width, minimumChildWidth, maxColumns]);

  return (
    <section ref={panel} style={state.style}>
      {children}
    </section>
  );
};

export default GridPanel;
