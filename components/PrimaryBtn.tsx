export default function PrimaryBtn({ text }: { text: string }) {
  return (
    <button className="bg-[#0072BC] w-fit text-white py-3 px-15 rounded-lg hover:bg-[#005a9e] transition-colors duration-300 poppins cursor-pointer">
      {text}
    </button>
  );
}
