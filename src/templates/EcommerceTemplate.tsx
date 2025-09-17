import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white/95 backdrop-blur-sm border-b border-primary/20 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="text-3xl">🐱</div>
              <div>
                <h1 className="text-2xl font-bold text-primary font-cute">Gatitos Felices</h1>
                <p className="text-xs text-muted-foreground">Todo para tu felino</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium flex items-center space-x-1"
              >
                <span>🏠</span>
                <span>Inicio</span>
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium flex items-center space-x-1"
              >
                <span>📝</span>
                <span>Blog</span>
              </Link>
            </nav>
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 text-primary hover:bg-primary/10"
            >
              <Heart className="h-4 w-4" />
              <span>Favoritos</span>
            </Button>
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground font-cute">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-gradient-to-r from-primary/90 to-accent/90 text-white py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-4xl">🐱</div>
              <div>
                <h3 className="text-2xl font-bold font-cute">Gatitos Felices</h3>
                <p className="text-white/80">Todo para tu felino favorito</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Somos una tienda especializada en productos de alta calidad para gatos. 
              Nuestro objetivo es hacer felices a los gatitos y a sus familias humanas.
            </p>
            <div className="flex space-x-4 text-2xl">
              <span>🐾</span>
              <span>💕</span>
              <span>🏆</span>
              <span>🚚</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Enlaces</h4>
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-white/80 hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>🏠</span>
                <span>Inicio</span>
              </Link>
              <Link 
                to="/blog" 
                className="block text-white/80 hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>📝</span>
                <span>Blog</span>
              </Link>
              <a 
                href="#" 
                className="block text-white/80 hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>📞</span>
                <span>Contacto</span>
              </a>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Información</h4>
            <div className="space-y-3 text-white/80">
              <div className="flex items-center space-x-2">
                <span>🚚</span>
                <span>Envío gratis +$50.000</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💳</span>
                <span>Pago seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔄</span>
                <span>Devoluciones fáciles</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>⭐</span>
                <span>Calidad garantizada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 mb-4 md:mb-0">
              &copy; 2024 Gatitos Felices. Hecho con 💕 para los gatitos más adorables.
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}