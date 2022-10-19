import { Component, createSignal, onCleanup } from 'solid-js';
import Chip from './MultiSelection/Chip';
import MultiSelection from './MultiSelection/MultiSelection';

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [hidden, setHidden] = createSignal(true);
  const [selected, setSelected] = createSignal<string[]>([
    'Beijing',
    'Chengdu',
  ]);
  const options = [
    'Beijing',
    'Chengdu',
    'Shanghai',
    'Guangzhou',
    'Shenzhen',
    'Hangzhou',
    'Beijing',
    'Chengdu',
    'Shanghai',
    'Guangzhou',
    'Shenzhen',
    'Hangzhou',
  ];
  let el: HTMLButtonElement | undefined;

  return (
    <div
      class="px-4 py-2  h-[900px]"
      onMouseMove={(e) => {
        //if (!e.currentTarget.contains(btn)) {
        //setX(e.pageX);
        //setY(e.pageY);
        //}
      }}
    >
      <div class="flex relative mt-4 gap-x-2 w-full h-16 bg-black px-2 overflow-hidden">
        {options.map((c) => (
          <button class="text-white rounded-full px-2.5 py-1 border border-gray-600/75 bg-gray-700/75 self-center">
            {c}
          </button>
        ))}

        <div class="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-gray-900/50 to-gray-900"></div>
      </div>
      <br />
      <MultiSelection
        options={options}
        selected={selected()}
        setSelected={setSelected}
      />
      <div class="mt-4 border-4 border-blue-800 rounded w-40 h-40 bg-teal-500  text-white relative
      arrow-r
      ">An amazing arrow</div>
    </div>
  );
};

export default App;
