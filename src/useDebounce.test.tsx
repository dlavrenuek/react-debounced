import React, { FC, useState } from 'react';
import useDebounce, { Debounce } from './useDebounce';
import { mount, ReactWrapper } from 'enzyme';

describe('useDebounce', () => {
  const DEFAULT_TIMEOUT = 50;

  const mockCallbackOne = jest.fn();
  const mockCallbackTwo = jest.fn();

  type TestButtonProps = {
    callback: () => unknown;
  };

  const TestButtonOne: FC<TestButtonProps> = ({ callback }) => (
    <button onClick={callback} />
  );

  const TestButtonTwo: FC<TestButtonProps> = ({ callback }) => (
    <button onClick={callback} />
  );

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
        <TestButtonOne callback={() => runCallback(debounceOne, callbackOne)} />
        <TestButtonTwo callback={() => runCallback(debounceTwo, callbackTwo)} />
      </>
    );
  };

  const wait = (time: number = DEFAULT_TIMEOUT + 10): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, time));

  let wrapper: ReactWrapper;

  const simulateClick = (component: FC<TestButtonProps>) => {
    wrapper.find(component).simulate('click');
  };

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(<TestComponent />);
  });

  it('Executes the callback', async () => {
    simulateClick(TestButtonOne);
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
  });

  it('Executes the callback after the timeout', async () => {
    simulateClick(TestButtonOne);
    expect(mockCallbackOne).toHaveBeenCalledTimes(0);
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
  });

  it('Executes the callback only once', async () => {
    simulateClick(TestButtonOne);
    simulateClick(TestButtonOne);
    simulateClick(TestButtonOne);
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
  });

  it('Executes both callbacks', async () => {
    simulateClick(TestButtonOne);
    simulateClick(TestButtonTwo);
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
    expect(mockCallbackTwo).toHaveBeenCalledTimes(1);
  });

  it('Executes no additional callbacks', async () => {
    simulateClick(TestButtonOne);
    simulateClick(TestButtonOne);
    simulateClick(TestButtonTwo);
    simulateClick(TestButtonTwo);
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
    expect(mockCallbackTwo).toHaveBeenCalledTimes(1);
    simulateClick(TestButtonTwo);
    await wait();
    expect(mockCallbackOne).toHaveBeenCalledTimes(1);
    expect(mockCallbackTwo).toHaveBeenCalledTimes(2);
  });
});
