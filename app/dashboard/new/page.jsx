"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, ArrowLeft } from "lucide-react"

export default function NewCarPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    condition: "",
    location: "",
    description: "",
    imageUrl: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("No estás logueado")
        setIsLoading(false)
        return
      }

      const payload = {
        title: `${formData.brand} ${formData.model}`,
        ...formData
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        alert("Auto publicado correctamente!")
        router.push("/dashboard")
      } else {
        alert(result.message || "Error al publicar el auto")
      }
    } catch (err) {
      console.error("Error al publicar auto:", err)
      alert("Ocurrió un error al publicar el auto")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-bold text-lg md:text-xl">AutoMarket</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Volver
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-8 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-xl md:text-2xl">Publicar Nuevo Vehículo</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Completa la información de tu auto para publicarlo
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marca</Label>
                    <Input
                      id="brand"
                      name="brand"
                      placeholder="Toyota, Honda, Ford..."
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder="Corolla, Civic, Mustang..."
                      value={formData.model}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Año</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      placeholder="2023"
                      value={formData.year}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condición</Label>
                    <Select onValueChange={(value) => handleSelectChange("condition", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona condición" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nuevo">Nuevo</SelectItem>
                        <SelectItem value="Seminuevo">Seminuevo</SelectItem>
                        <SelectItem value="Usado">Usado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio (USD)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="25000"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Kilometraje</Label>
                    <Input
                      id="mileage"
                      name="mileage"
                      type="number"
                      placeholder="50000"
                      value={formData.mileage}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Buenos Aires, Argentina"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL de Imagen</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe las características y condición del vehículo..."
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Publicando..." : "Publicar Vehículo"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
