

export default function Checkbox({text, ...rest}) {
  return (
    <label style={{display:"flex",alignItems:"center",gap:".2rem"}} >
      <input type="checkbox" {...rest} />
       <span> {text}</span>
    </label>
  );
}
