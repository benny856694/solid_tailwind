import _ from 'lodash';
import { createSignal, For, onCleanup, Setter } from 'solid-js';
import clickOutSide from '../hideOnClickOutside';

type Props = {
  options: string[];
  selections: string[];
  setSelections: Setter<string[]>;
  hidden: boolean;
  setHidden: Setter<boolean>;
  hiliteIndex: number | undefined;
  setHiliteIndex: Setter<number | undefined>;
};

export default function OptionsPanel(props: Props) {
  let popupContainer: HTMLDivElement | undefined;
  const onClick = (e: MouseEvent) => {
    console.log(
      'handle click on body',
      'eventPhase',
      e.eventPhase,
      'eventBubble',
      e.bubbles,
      'currentTarget',
      e.currentTarget
    );
    //e.stopPropagation()
    !popupContainer!.contains(e.target as Node) && props.setHidden(true);
  };
  //document.addEventListener('click', onClick, false);
  //onCleanup(() => document.removeEventListener('click', onClick));
  function isSelected(s: string) {
    return props.selections.findIndex((v) => v === s) !== -1;
  }
  return (
    <div
      //use:clickOutSide={() => props.setHidden(true)}
      ref={popupContainer}
      classList={{
        hidden: props.hidden,
        absolute: true,
        border: true,
        rounded: true,
        'overflow-hidden': true,
      }}
      style={{
        left: '0px',
        top: 'calc(100% + 5px)',
        width: '100%',
      }}
    >
      <For each={props.options}>
        {(item, i) => (
          <label
            onClick={() => {
              const isSel = isSelected(item);
              if (isSel) {
                const arr = [...props.selections.filter((x) => x !== item)];
                props.setSelections(arr);
              } else {
                props.setSelections([...props.selections, item]);
              }
            }}
            onPointerEnter={() => props.setHiliteIndex(i())}
            class={`cursor-pointer block px-4 ${props.hiliteIndex === i() ? 'bg-gray-400' : isSelected(item) && 'bg-gray-200'}`}
          >
            {item}
          </label>
        )}
      </For>
    </div>
  );
}
