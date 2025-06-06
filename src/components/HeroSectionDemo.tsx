
import { HeroSection } from "@/components/ui/hero-section-dark"

function HeroSectionDemo() {
  return (
    <HeroSection
      title="TZ Portfolio Tracker - Your Investment Journey Starts Here"
      subtitle={{
        regular: "Master your investments with ",
        gradient: "Tanzania's premier portfolio platform",
      }}
      description="Track your shares, bonds, and units with real-time updates. Learn from experts, stay informed with market news, and make data-driven investment decisions in Tanzania's financial markets."
      ctaText="Start Tracking"
      ctaHref="/portfolio"
      bottomImage={{
        light: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        dark: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      }}
      gridOptions={{
        angle: 65,
        opacity: 0.3,
        cellSize: 50,
        lightLineColor: "#00FFFF",
        darkLineColor: "#1A1A1A",
      }}
    />
  )
}

export { HeroSectionDemo }
