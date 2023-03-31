

export default function Checkbox({className,text, ...rest}) {
  return (
    <label className={className} style={{display:"flex",alignItems:"center",gap:".2rem"}} >
      <input type="checkbox" {...rest} />
       <span> {text}</span>
    </label>
  );
}
