import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectCount,
} from '../../redux/counterSlice';
import './Counter.scss';

interface Props {
  fn?: (e:string) => void,
}
function Counter ({fn}:Props) {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState<object>({});
  return (
    <div>
      <h1>abc</h1>
    </div>
  );
}
export default Counter
