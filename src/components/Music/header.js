export default function SectionHeader({ text }) {
  return (
    <div className="h-auto lg:w-full lg:px-10">
      <div className="flex flex-row align-middle">
        <h2 className="font-inter text-2xl lg:text-xl font-semibold text-Black"> {text}</h2>
        <div className="mx-6 h-px grow bg-gradient-to-r from-black to-transparent self-center"></div>
      </div>
    </div>
  );
}
