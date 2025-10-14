import { Car } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Car className="h-12 w-12 animate-bounce text-primary" />
        <p className="text-lg text-muted-foreground">Cargando...</p>
      </div>
    </div>
  )
}
