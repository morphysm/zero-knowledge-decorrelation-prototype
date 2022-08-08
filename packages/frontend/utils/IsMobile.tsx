import * as React from 'react';
import { ViewportContext } from '../context/ViewportProvider';

import { breakpoints } from './Breakpoints';

const IsMobile = () => {
  const { width } = React.useContext(ViewportContext);
  return width < breakpoints.mobile;
};

export default IsMobile;
