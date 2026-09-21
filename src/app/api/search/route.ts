import {NextRequest,NextResponse} from 'next/server';import {getProducts} from '@/lib/products';
export function GET(request:NextRequest){const q=request.nextUrl.searchParams.get('q')||'';return NextResponse.json({data:getProducts({q})})}
