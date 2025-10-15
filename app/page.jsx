
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Car, Shield, Clock, MapPin, User, Phone, Mail, Gauge } from "lucide-react"


const featuredCars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 28500,
    mileage: 15000,
    image: "/toyota-camry-2022.jpg",
    location: "Buenos Aires",
    condition: "Usado",
    description:
      "Excelente estado, único dueño. Mantenimiento al día en concesionaria oficial. Incluye kit de seguridad completo y sistema de navegación GPS.",
    seller: {
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      phone: "+54 11 1234-5678",
    },
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 32000,
    mileage: 8000,
    image: "/honda-civic-2023.jpg",
    location: "Córdoba",
    condition: "Usado",
    description:
      "Como nuevo, pocos kilómetros. Equipamiento full con asientos de cuero, techo solar y sistema de sonido premium.",
    seller: {
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+54 351 987-6543",
    },
  },
  {
    id: 3,
    brand: "Ford",
    model: "Mustang",
    year: 2021,
    price: 45000,
    mileage: 22000,
    image: "/ford-mustang-2021.jpg",
    location: "Rosario",
    condition: "Usado",
    description:
      "Motor V8, transmisión automática. Impecable estado mecánico y estético. Llantas deportivas y escape deportivo.",
    seller: {
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      phone: "+54 341 555-1234",
    },
  },
  {
    id: 4,
    brand: "Chevrolet",
    model: "Cruze",
    year: 2023,
    price: 26000,
    mileage: 5000,
    image: "/chevrolet-cruze-2023.jpg",
    location: "Mendoza",
    condition: "Seminuevo",
    description:
      "Prácticamente sin uso, garantía de fábrica vigente. Control de crucero, sensores de estacionamiento y cámara trasera.",
    seller: {
      name: "Ana Martínez",
      email: "ana.martinez@email.com",
      phone: "+54 261 444-7890",
    },
  },
  {
    id: 5,
    brand: "Volkswagen",
    model: "Golf",
    year: 2022,
    price: 29500,
    mileage: 12000,
    image: "/volkswagen-golf-2022.jpg",
    location: "La Plata",
    condition: "Usado",
    description:
      "Versión GTI, motor turbo. Excelente performance y economía de combustible. Sistema de frenado ABS y control de estabilidad.",
    seller: {
      name: "Roberto Silva",
      email: "roberto.silva@email.com",
      phone: "+54 221 333-4567",
    },
  },
  {
    id: 6,
    brand: "Nissan",
    model: "Sentra",
    year: 2023,
    price: 27000,
    mileage: 6000,
    image: "/nissan-sentra-2023.jpg",
    location: "Tucumán",
    condition: "Seminuevo",
    description:
      "Bajo kilometraje, ideal para ciudad. Aire acondicionado automático, Bluetooth y pantalla táctil de 8 pulgadas.",
    seller: {
      name: "Laura Fernández",
      email: "laura.fernandez@email.com",
      phone: "+54 381 222-9876",
    },
  },
]

export default function HomePage() {
  const [selectedCar, setSelectedCar] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Comprar
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Vender
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Financiamiento
            </Link>
          </nav>

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

      {/* Features */}
      <section className="py-8 md:py-12 border-b">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Compra Segura</h3>
              <p className="text-sm text-muted-foreground">Todos los vehículos verificados y con garantía</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Proceso Rápido</h3>
              <p className="text-sm text-muted-foreground">Publica tu auto en minutos y recibe ofertas</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Miles de Opciones</h3>
              <p className="text-sm text-muted-foreground">Encuentra el vehículo perfecto para ti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Autos Destacados</h2>
              <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
                Los mejores vehículos disponibles ahora
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="#">Ver Todos</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuredCars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3">{car.condition}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">
                      {car.brand} {car.model}
                    </h3>
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
                  <Button size="sm" onClick={() => handleViewDetails(car)}>
                    Ver Detalles
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">¿Quieres Vender tu Auto?</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Regístrate gratis y publica tu vehículo en minutos. Miles de compradores te están esperando.
            </p>
            <Button size="lg" asChild>
              <Link href="/register">Publicar Gratis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12 mt-auto">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                <span className="font-bold">AutoMarket</span>
              </div>
              <p className="text-sm text-muted-foreground">Tu marketplace de confianza para comprar y vender autos.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Comprar</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Autos Usados
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Autos Nuevos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Por Marca
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Vender</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Publicar Auto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Consejos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Precios
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Ayuda</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Términos
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
            <p>&copy; 2025 AutoMarket. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

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
                    src={selectedCar.image || "/placeholder.svg"}
                    alt={`${selectedCar.brand} ${selectedCar.model}`}
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-2 right-2 md:top-3 md:right-3">{selectedCar.condition}</Badge>
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
                        <p className="font-medium text-sm md:text-base">{selectedCar.seller.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs md:text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-sm md:text-base truncate">{selectedCar.seller.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-xs md:text-sm text-muted-foreground">Teléfono</p>
                        <p className="font-medium text-sm md:text-base">{selectedCar.seller.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <Button className="w-full" size="lg">
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
