"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Car, Shield, Clock, MapPin, User, Phone, Mail, Gauge } from "lucide-react"

export default function HomePage() {
  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/car") 
        if (!res.ok) throw new Error("Error al obtener autos")
        const data = await res.json()
        setCars(data)
      } catch (err) {
        console.error("Error al cargar autos:", err)
      }
    }
    fetchCars()
  }, [])

  const handleViewDetails = (car) => {
    setSelectedCar(car)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-5 w-5 md:h-6 md:w-6" />
            <span className="font-bold text-lg md:text-xl">AutoMarket</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="sm" className="text-xs md:text-sm" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" className="text-xs md:text-sm" asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-8 md:py-12 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance">
              Encuentra el Auto de tus Sueños
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground text-pretty px-4">
              Miles de vehículos verificados. Compra y vende con confianza.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-2xl mx-auto mt-6 md:mt-8 px-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar por marca, modelo o año..." className="pl-10 h-11 md:h-12" />
              </div>
              <Button size="lg" className="h-11 md:h-12 px-6 md:px-8">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="xl md:text-3xl font-bold tracking-tight">Autos Destacados</h2>
              <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
                Los mejores vehículos disponibles ahora
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="#">Ver Todos</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={car.images?.[0]?.url || "/placeholder.svg"} // Primera imagen
                    alt={`${car.brand} ${car.model}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3">{car.condition || "Usado"}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{car.brand} {car.model}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{car.year}</span>
                      <span>•</span>
                      <span>{car.mileage.toLocaleString("es-AR")} km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{car.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="text-2xl font-bold">${car.price.toLocaleString()}</div>
                  <Button size="sm" onClick={() => handleViewDetails(car)}>Ver Detalles</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
          {selectedCar && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl">
                  {selectedCar.brand} {selectedCar.model} {selectedCar.year}
                </DialogTitle>
                <DialogDescription className="text-sm md:text-base">
                  Información completa del vehículo
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 md:space-y-6">
                {/* Car Image */}
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedCar.images?.[0]?.url || "/placeholder.svg"}
                    alt={`${selectedCar.brand} ${selectedCar.model}`}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2 md:top-3 md:right-3">{selectedCar.condition || "Usado"}</Badge>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between p-3 md:p-4 bg-muted rounded-lg">
                  <span className="text-base md:text-lg font-semibold">Precio</span>
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    ${selectedCar.price.toLocaleString()}
                  </span>
                </div>

                {/* Car Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Car className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Marca</p>
                      <p className="font-semibold text-sm md:text-base">{selectedCar.brand}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Car className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Modelo</p>
                      <p className="font-semibold text-sm md:text-base">{selectedCar.model}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Año</p>
                      <p className="font-semibold text-sm md:text-base">{selectedCar.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Gauge className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Kilometraje</p>
                      <p className="font-semibold text-sm md:text-base">{selectedCar.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg sm:col-span-2">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm text-muted-foreground">Ubicación</p>
                      <p className="font-semibold text-sm md:text-base">{selectedCar.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-base md:text-lg">Descripción</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {selectedCar.description}
                  </p>
                </div>

                {/* Seller Information */}
                <div className="border-t pt-4 md:pt-6 space-y-3 md:space-y-4">
                  <h3 className="font-semibold text-base md:text-lg">Información del Vendedor</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground">Nombre</p>
                        <p className="font-medium text-sm md:text-base">{selectedCar.user?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground">Teléfono</p>
                        <p className="font-medium text-sm md:text-base">{selectedCar.user?.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    if (selectedCar.user?.phone) {
                      const phone = selectedCar.user.phone.replace(/\D/g, "")
                      const message = `Hola ${selectedCar.user.name}, estoy interesado en el ${selectedCar.brand} ${selectedCar.model} (${selectedCar.year}).`
                      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank")
                    } else {
                      alert("El vendedor no tiene número de WhatsApp disponible.")
                    }
                  }}
                >
                  Contactar Vendedor
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
