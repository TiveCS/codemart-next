import { increment } from '../../redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export default function Test() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Test: {count}</h1>

      <button onClick={() => dispatch(increment())}>Add</button>
    </>
  );
}
