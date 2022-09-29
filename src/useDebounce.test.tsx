import React, { FC, PropsWithChildren, useState } from 'react';
import useDebounce, { Debounce } from './useDebounce';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('useDebounce', () => {
  const DEFAULT_TIMEOUT = 50;

  const mockCallbackOne = jest.fn();
  const mockCallbackTwo = jest.fn();

  type TestButtonProps = {
    callback: () => unknown;
  };

  const TestButton: FC<PropsWithChildren<TestButtonProps>> = ({
    callback,
    children,
  }) => <button onClick={callback}>{children}</button>;

  type Callback = () => unknown;

  type TestComponentProps = {
    timeoutOne?: number;
    callbackOne?: Callback;
    timeoutTwo?: number;
    callbackTwo?: Callback;
  };

  const TestComponent = ({
    callbackOne = mockCallbackOne,
    callbackTwo = mockCallbackTwo,
    timeoutOne = DEFAULT_TIMEOUT,
    timeoutTwo = DEFAULT_TIMEOUT,
  }: TestComponentProps) => {
    const debounceOne = useDebounce(timeoutOne);
    const debounceTwo = useDebounce(timeoutTwo);
    const [testVar, setTestVar] = useState(0);
    const runCallback = (debounce: Debounce, callback: Callback) => {
      setTestVar(testVar + 1);
      debounce(callback);
    };
    return (
      <>
        {testVar}
        <TestButton callback={() => runCallback(debounceOne, callbackOne)}>
          one
        </TestButton>
        <TestButton callback={() => runCallback(debounceTwo, callbackTwo)}>
          two
        </TestButton>
      </>
    );
  };

  const wait = (time: number = DEFAULT_TIMEOUT + 10): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, time));

  const simulateClick = (name: string) =>
    userEvent.click(screen.getByRole('button', { name }));

  const clickFirst = () => simulateClick('one');
  const clickSecond = () => simulateClick('two');

  beforeEach(() => {
    jest.clearAllMocks();
    render(<TestComponent />);
  });

  it('Executes the callback', async () => {
    await clickFirst();
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
  });

  it('Executes the callback after the timeout', async () => {
    await clickFirst();
    expect(mockCallbackOne).toHaveBeenCalledTimes(0);
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
  });

  it('Executes the callback only once', async () => {
    await clickFirst();
    await clickFirst();
    await clickFirst();
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
  });

  it('Executes both callbacks', async () => {
    await clickFirst();
    await clickSecond();
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
    expect(mockCallbackTwo).toHaveBeenCalledTimes(1);
  });

  it('Executes no additional callbacks', async () => {
    await clickFirst();
    await clickFirst();
    await clickSecond();
    await clickSecond();
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
    expect(mockCallbackTwo).toHaveBeenCalledTimes(1);
    await clickSecond();
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
    expect(mockCallbackTwo).toHaveBeenCalledTimes(2);
  });
});
