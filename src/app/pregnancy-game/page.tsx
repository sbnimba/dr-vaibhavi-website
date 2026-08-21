import Link from 'next/link';
import PregnancyGame from '@/components/PregnancyGame';

export default function PregnancyGamePage() {
    return (
        <main className="min-h-screen bg-rose-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold text-primary-600 hover:text-primary-700 bg-white border border-rose-200 px-4 py-2 rounded-full shadow-sm"
                    >
                        ← Back to Homepage
                    </Link>
                    <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                        🎮 Interactive Game
                    </span>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-2">
                        Dr. Vaibhavi's Safe Pregnancy Journey
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
                        An interactive game designed for Indian mothers to explore pregnancy stages, nutritious foods, and precautions in both English and Hindi.
                    </p>
                </div>

                <PregnancyGame />
            </div>
        </main>
    );
}
