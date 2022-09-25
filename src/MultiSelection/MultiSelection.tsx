import {
  createEffect,
  createSignal,
  For,
  Setter,
  createRenderEffect,
} from 'solid-js';

import Chip from '../MultiSelection/Chip';
import OptionsPanel from '../MultiSelection/OptionsPanel';
import * as _ from 'lodash'

type Props = {
  options: string[];
  selected: string[];
  setSelected: Setter<string[]>;
};

export default function MultiSelection(props: Props) {
  const [hidden, setHidden] = createSignal(true);
  const [hiliteIndex, setHiliteIndex] = createSignal<number | undefined>();

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.target !== container) return;
    switch (e.code) {
      case 'Enter':
        e.preventDefault()
        setHidden(v => !v)
        break;
      case 'Space':
        e.preventDefault()
        const hilitIdx = hiliteIndex()
        if (hilitIdx !== undefined) {
          const hilitItem = props.options[hilitIdx]
          const isSelected = _.find(props.selected, x => x === hilitItem)
          if (isSelected) {
            const next = _.without(props.selected, isSelected)
            props.setSelected([...next])
          } else {
            props.setSelected([...props.selected, hilitItem])
          }
        }
        break;
      case 'ArrowDown':
        const next = ((hiliteIndex() ?? 0) + 1) % props.options.length
        setHiliteIndex(next)
        break;
      case 'ArrowUp':
        let nextUp = ((hiliteIndex() ?? 0) - 1)
        nextUp = nextUp === -1 ? props.options.length - 1 : nextUp
        setHiliteIndex(nextUp)
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
        onkeydown={handleKeyboard}
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
          class={`origin-[50%_25%] transition cursor-pointer border-4 border-transparent mr-1 border-t-4 border-t-gray-500 translate-y-1/2 self-center ${hidden() ? 'rotate-0' : '-rotate-90'
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
          hiliteIndex={hiliteIndex()}
          setHiliteIndex={setHiliteIndex}
        />
      </div>
    </>
  );
}
