import {
  createEffect,
  createSignal,
  For,
  Setter,
  createRenderEffect,
} from 'solid-js';

import Chip from '../MultiSelection/Chip';
import OptionsPanel from '../MultiSelection/OptionsPanel';

type Props = {
  options: string[];
  selected: string[];
  setSelected: Setter<string[]>;
};

export default function MultiSelection(props: Props) {
  const [hidden, setHidden] = createSignal(true);

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.target !== container) return;
    switch (e.code) {
      case 'Enter':
      case 'Space':
        setHidden(v=>!v)
        break;
    }
  };

  createEffect(() => {
    console.log('hide:', hidden());
  });

  let container: HTMLDivElement | undefined = undefined;
  return (
    <>
      <div
        ref={container}
        tabIndex={0}
        onFocus={() => console.log('focused')}
        onBlur={() => {
          setHidden(true);
          console.log('blurred');
        }}
        class="flex content-center border rounded border-gray-400 gap-1 p-1 relative w-[300px]"
      >
        <div class="flex flex-wrap mr-auto gap-1 ">
          <For each={props.selected}>
            {(item) => (
              <Chip
                onCloseClick={(s) => {
                  const arr = props.selected.filter((x) => x !== item);
                  props.setSelected([...arr]);
                }}
                tag={item}
              />
            )}
          </For>
        </div>

        <span
          class="cursor-pointer ml-0.5 text-lg self-center"
          onClick={() => props.setSelected([])}
        >
          &times;
        </span>
        <div class="border-gray-500 border-l mx-1"></div>
        <div
          class={`origin-[50%_25%] transition cursor-pointer border-4 border-transparent mr-1 border-t-4 border-t-gray-500 translate-y-1/2 self-center ${
            hidden() ? 'rotate-0' : '-rotate-90'
          } `}
          onClick={(e) => {
            console.log(
              'clicked on element',
              'eventPhase',
              e.eventPhase,
              'eventBubble',
              e.bubbles,
              'currentTarget',
              e.currentTarget
            );

            //e.stopImmediatePropagation();

            setHidden((v) => !v);
          }}
        ></div>
        <OptionsPanel
          hidden={hidden()}
          setSelections={props.setSelected}
          setHidden={setHidden}
          options={props.options}
          selections={props.selected}
        />
      </div>
    </>
  );
}
