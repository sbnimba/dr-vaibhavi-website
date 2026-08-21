import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pregnancy Journey Game & Interactive Guide | Dr. Vaibhavi',
    description: 'An interactive, gamified guide for Indian mothers — learn trimester milestones, healthy thali nutrition, and precautions in Hindi and English.',
};

export default function PregnancyGameLayout({ children }: { children: React.ReactNode }) {
    return children;
}
