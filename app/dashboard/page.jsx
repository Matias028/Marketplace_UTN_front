"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Car, Plus, Edit, Trash2, MapPin } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [cars, setCars] = useState([])
  const [welcomeMsg, setWelcomeMsg] = useState("")

  // Modal de eliminación
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [carToDelete, setCarToDelete] = useState(null)

  // Modal de edición
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [carToEdit, setCarToEdit] = useState(null)
  const [editForm, setEditForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    location: "",
    imageUrl: "",
  })

  // Cargar autos del usuario
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const user = localStorage.getItem("user")
    if (user) {
      const parsedUser = JSON.parse(user)
      setWelcomeMsg(`Bienvenido ${parsedUser.name}`)

      const fetchUserCars = async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/car/user/${parsedUser.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          if (!res.ok) throw new Error("Error al obtener autos del usuario")
          const data = await res.json()
          setCars(data)
        } catch (err) {
          console.error("Error al cargar autos:", err)
        }
      }

      fetchUserCars()
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  // Eliminar auto
  const handleDelete = async () => {
    if (!carToDelete) return
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:8080/api/car/${carToDelete.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Error al eliminar auto")
      setCars(cars.filter((car) => car.id !== carToDelete.id))
      setCarToDelete(null)
      setIsDialogOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  const openDeleteDialog = (car) => {
    setCarToDelete(car)
    setIsDialogOpen(true)
  }

  // Editar auto
  const openEditDialog = (car) => {
    setCarToEdit(car)
    setEditForm({
      brand: car.brand || "",
      model: car.model || "",
      year: car.year || "",
      price: car.price || "",
      mileage: car.mileage || "",
      location: car.location || "",
      imageUrl: car.images?.[0]?.url || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  const handleEditSubmit = async () => {
    if (!carToEdit) return
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:8080/api/car/${carToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      })
      if (!res.ok) throw new Error("Error al actualizar auto")
      const updatedCar = await res.json()
      setCars(cars.map((c) => (c.id === updatedCar.id ? updatedCar : c)))
      setCarToEdit(null)
      setIsEditDialogOpen(false)
    } catch (err) {
      console.error(err)
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
          <div className="flex items-center gap-2 md:gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="text-xs md:text-sm">Inicio</Button>
            </a>
            <Button variant="ghost" size="sm" className="text-xs md:text-sm" onClick={handleLogout}>Cerrar Sesión</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-8 px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{welcomeMsg}</h1>
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
          <Card className="p-8 md:p-12 text-center">
            <Car className="h-12 w-12 md:h-16 md:w-16 mx-auto text-muted-foreground" />
            <h3 className="text-lg md:text-xl font-semibold">No tienes publicaciones</h3>
            <p className="text-sm md:text-base text-muted-foreground">Comienza publicando tu primer vehículo</p>
            <Button asChild>
              <Link href="/dashboard/new">
                <Plus className="h-4 w-4 mr-2" />
                Publicar Auto
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={car.images?.[0]?.url || "/placeholder.svg"} alt={`${car.brand} ${car.model}`} className="object-cover w-full h-full" />
                  <Badge className="absolute top-3 right-3">{car.status || "Activo"}</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{car.brand} {car.model}</CardTitle>
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
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent text-xs md:text-sm" onClick={() => openEditDialog(car)}>
                    <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1 text-xs md:text-sm" onClick={() => openDeleteDialog(car)}>
                    <Trash2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Modal de eliminación */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar el auto <strong>{carToDelete?.brand} {carToDelete?.model}</strong>? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Auto</DialogTitle>
            <DialogDescription>Modifica los datos de tu vehículo</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3">
            <input type="text" name="brand" placeholder="Marca" value={editForm.brand} onChange={handleEditChange} className="input input-bordered w-full" />
            <input type="text" name="model" placeholder="Modelo" value={editForm.model} onChange={handleEditChange} className="input input-bordered w-full" />
            <input type="number" name="year" placeholder="Año" value={editForm.year} onChange={handleEditChange} className="input input-bordered w-full" />
            <input type="number" name="price" placeholder="Precio" value={editForm.price} onChange={handleEditChange} className="input input-bordered w-full" />
            <input type="number" name="mileage" placeholder="Kilometraje" value={editForm.mileage} onChange={handleEditChange} className="input input-bordered w-full" />
            <input type="text" name="location" placeholder="Ubicación" value={editForm.location} onChange={handleEditChange} className="input input-bordered w-full" />
            <input type="text" name="imageUrl" placeholder="URL Imagen" value={editForm.imageUrl} onChange={handleEditChange} className="input input-bordered w-full" />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={handleEditSubmit}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
