import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useId } from "react"

type Props = {
  label: string
  description: string
  placeholder?: string
}

export function TextareaWithText({
  label,
  description,
  placeholder
}: Props): React.JSX.Element {
  const id = useId()

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea placeholder={placeholder} id={id} aria-describedby={`desc-${id}`} rows={5} cols={50} />
      <p className="text-sm text-muted-foreground" id={`desc-${id}`}>
        {description}
      </p>
    </div>
  )
}
