export default function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-semibold">{value}</span>
      <span className="text-xs tracking-widest uppercase opacity-80">{label}</span>
    </div>
  )
}
