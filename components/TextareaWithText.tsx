import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useId } from "react"

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  description: string
}

export function TextareaWithText({
  label,
  description,
  ...rest
}: Props): React.JSX.Element {
  const id = useId()

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} aria-describedby={`desc-${id}`} {...rest} />
      <p className="text-sm text-muted-foreground" id={`desc-${id}`}>
        {description}
      </p>
    </div>
  )
}
