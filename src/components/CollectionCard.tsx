import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star } from 'lucide-react'
import { type Collection } from '@/lib/supabase'
import { useState } from 'react'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="group overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative">
          {/* Collection Image */}
          <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/30 overflow-hidden">
            {collection.image && !imageError ? (
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🐾</div>
                  <p className="text-primary font-medium">Colección</p>
                </div>
              </div>
            )}
          </div>

          {/* Featured Badge */}
          {collection.featured && (
            <Badge className="absolute top-3 right-3 bg-primary text-white font-bold flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current" />
              <span>Destacada</span>
            </Badge>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-primary font-bold text-xl line-clamp-1 group-hover:text-primary/80 transition-colors">
              {collection.name}
            </h3>
            <div className="text-2xl ml-2">
              {collection.name.toLowerCase().includes('juguete') ? '🧸' :
               collection.name.toLowerCase().includes('cama') || collection.name.toLowerCase().includes('descanso') ? '🛏️' :
               collection.name.toLowerCase().includes('accesorio') ? '👑' : '🐱'}
            </div>
          </div>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full text-primary border-primary/30 hover:bg-primary hover:text-white transition-all duration-200 rounded-xl font-medium flex items-center justify-center space-x-2 group/btn"
            onClick={() => onViewProducts(collection.id)}
          >
            <span>Ver Productos</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}