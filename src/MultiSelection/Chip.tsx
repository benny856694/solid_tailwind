type Props = {
  tag: string;
  onCloseClick: (s: string) => void;
};

export default function Chip(props: Props) {
  return (
    <div class="group inline-flex  py-0.5 text-xs items-center border rounded border-gray-400 cursor-pointer px-1">
      {props.tag}
      <span
        onClick={() => props.onCloseClick(props.tag)}
        class="ml-0.5 group-hover:text-red-500"
      >
        &times;
      </span>
    </div>
  );
}
