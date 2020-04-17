import { useEffect, useLayoutEffect } from 'react';
import globalWindow from '../utils/globalWindow';

export default globalWindow.document ? useLayoutEffect : useEffect;
