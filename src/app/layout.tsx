import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/components/CartProvider';
export const metadata: Metadata={title:{default:'VÉRANE | Defined by your style',template:'%s | VÉRANE'},description:'VÉRANE creates considered essentials and expressive silhouettes for modern wardrobes.',metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000')};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><CartProvider><Header/><main>{children}</main><Footer/></CartProvider></body></html>}
