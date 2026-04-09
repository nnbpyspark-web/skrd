import Link from "next/link";
import { Button } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-saffron-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-500/10 rounded-full blur-2xl flex-shrink-0" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl flex-shrink-0" />
        
        <h1 className="text-6xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-saffron-500 to-gold-500 mb-4 drop-shadow-sm">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-temple-dark mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          The sanctuary you are looking for does not exist or has been moved. 
          Please return to the main temple grounds.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button href="/" variant="primary" size="lg" className="w-full sm:w-auto">
            Get Back Home
          </Button>
        </div>

        <div className="mt-8 text-saffron-500 animate-bounce">
          🕉️
        </div>
      </div>
    </div>
  );
}
