import { Component, createSignal, onCleanup } from 'solid-js';
import Chip from './MultiSelection/Chip';
import MultiSelection from './MultiSelection/MultiSelection';



const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [hidden, setHidden] = createSignal(true);
  const [selected, setSelected] = createSignal<string[]>(['Beijing', 'Chengdu']);
  const options = ['Beijing', 'Chengdu', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Hangzhou'];
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
      <button
        class="p-2 bg-blue-400 text-white rounded-md mt-4 ml-4 uppercase border-2"
        ref={el}
        onClick={(e) => {
          e.target.requestFullscreen()
        }}
      >
        Full Screen
      </button>
      <p>
        Mouse Position: X: {x()}, Y: {y()}
      </p>
      <div
        
        classList={{
          'w-40': true,
          'h-40': true,
          'bg-red-500': true,
          absolute: true,
          'rounded-md': true,
          'shadow-2xl': true,
          'z-10': true,
          'py-2': false,
          'overflow-hidden': true,
          hidden: hidden(),
        }}
        onClick={() => setHidden(true)}
        style={{ left: x() + 'px', top: y() + 'px' }}
      >
        <p class="hover:bg-gray-400 hover:text-white m-2 rounded-md cursor-pointer py-1 px-2">
          Menu1
        </p>
        <p class="hover:bg-gray-400 hover:text-white m-2 rounded-md cursor-pointer py-1 px-2">
          Menu1
        </p>
      </div>
      <div class="flex mt-4 gap-x-2">
        <div class="w-20 bg-red-500 h-20 grow"></div>
        <div class="w-20 bg-red-500 h-20"></div>
      </div>
      <br/>
      <MultiSelection options={options} selected={selected()} setSelected={setSelected} />
    </div>
  );
};

export default App;
