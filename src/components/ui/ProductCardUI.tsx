import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"
import { useState } from "react"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Este componente solo maneja la presentación de las tarjetas de producto.
 * Toda la lógica viene del HeadlessProductCard.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Animaciones y efectos
 * - Agregar features visuales (favoritos, etc.)
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="group overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm">
          <div className="relative overflow-hidden">
            {/* Product Image */}
            <div className="aspect-square bg-gradient-to-br from-muted/30 to-muted/60 overflow-hidden">
              {product.images && product.images.length > 0 && !imageError ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🐱
                </div>
              )}
            </div>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 ${
                isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>

            {/* Discount Badge */}
            {logic.hasDiscount && (
              <Badge className="absolute top-3 left-3 bg-primary text-white font-bold">
                -{logic.discountPercentage}%
              </Badge>
            )}

            {/* Featured Badge */}
            {logic.isFeatured && (
              <Badge className="absolute bottom-3 left-3 bg-accent text-accent-foreground font-medium flex items-center space-x-1">
                <Star className="h-3 w-3 fill-current" />
                <span>Destacado</span>
              </Badge>
            )}
          </div>

          <CardContent className="p-4">
            {/* Product Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            {/* Product Description */}
            {product.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Price Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
              {logic.hasVariants && (
                <Badge variant="secondary" className="text-xs">
                  {logic.variants?.length} opciones
                </Badge>
              )}
            </div>

            {/* Options Selection */}
            {logic.hasVariants && logic.options && (
              <div className="space-y-3 mb-4">
                {logic.options.map((option) => (
                  <div key={option.name}>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {option.values.map((value) => {
                        const isSelected = logic.selected[option.name] === value
                        const isAvailable = logic.isOptionValueAvailable(option.name, value)
                        
                        return (
                          <Button
                            key={value}
                            variant={isSelected ? "default" : "outline"}
                            size="sm"
                            disabled={!isAvailable}
                            onClick={() => logic.handleOptionSelect(option.name, value)}
                            className={`text-xs h-8 ${
                              !isAvailable ? "opacity-50 cursor-not-allowed" : ""
                            } ${
                              isSelected ? "bg-primary text-white" : "hover:bg-primary/10"
                            }`}
                          >
                            {value}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              onClick={() => {
                logic.handleAddToCart()
                logic.onAddToCartSuccess()
              }}
              disabled={!logic.canAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>
                {logic.inStock 
                  ? (logic.hasVariants && !logic.matchingVariant ? 'Seleccionar opciones' : 'Agregar al carrito')
                  : 'Sin stock'
                }
              </span>
            </Button>

            {/* Stock Status */}
            {!logic.inStock && (
              <p className="text-center text-sm text-muted-foreground mt-2">
                😿 Temporalmente agotado
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}