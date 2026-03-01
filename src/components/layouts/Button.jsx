const Button = (props) => {
  return (
    <div className="px-6 py-1 border-1 border-black bg-black text-white transition-all rounded-full cursor-pointer w-fit">
      {props.title}
    </div>
  );
};

export default Button;
