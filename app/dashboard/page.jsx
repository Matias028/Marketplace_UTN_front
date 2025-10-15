"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Plus, Edit, Trash2, MapPin } from "lucide-react"

// 🔹 Datos mock (después los reemplazás con los del backend)
const mockUserCars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    price: 18500,
    mileage: 45000,
    image: "/toyota-corolla-2020.jpg",
    location: "Buenos Aires",
    status: "Activo",
  },
  {
    id: 2,
    brand: "Honda",
    model: "Accord",
    year: 2021,
    price: 24000,
    mileage: 32000,
    image: "/honda-accord-2021.jpg",
    location: "Córdoba",
    status: "Activo",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [cars, setCars] = useState(mockUserCars)


  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])


  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  const handleDelete = (id) => {
    // TODO: reemplazar con delete real
    setCars(cars.filter((car) => car.id !== id))
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

          <nav className="flex items-center gap-2 md:gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-xs md:text-sm">
                Inicio
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-xs md:text-sm" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-8 px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Mis Publicaciones</h1>
            <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">Gestiona tus vehículos en venta</p>
          </div>
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link href="/dashboard/new">
              <Plus className="h-4 w-4 mr-2" />
              Publicar Auto
            </Link>
          </Button>
        </div>

        {cars.length === 0 ? (
          <Card className="p-8 md:p-12">
            <div className="text-center space-y-4">
              <Car className="h-12 w-12 md:h-16 md:w-16 mx-auto text-muted-foreground" />
              <h3 className="text-lg md:text-xl font-semibold">No tienes publicaciones</h3>
              <p className="text-sm md:text-base text-muted-foreground">Comienza publicando tu primer vehículo</p>
              <Button asChild>
                <Link href="/dashboard/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Publicar Auto
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-3 right-3">{car.status}</Badge>
                </div>
                <CardHeader>
                  <CardTitle>
                    {car.brand} {car.model}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{car.year}</span>
                    <span>•</span>
                    <span>{car.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{car.location}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${car.price.toLocaleString()}</div>
                </CardContent>
                <CardFooter className="flex gap-2 p-3 md:p-4">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs md:text-sm">
                    <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 text-xs md:text-sm"
                    onClick={() => handleDelete(car.id)}
                  >
                    <Trash2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
