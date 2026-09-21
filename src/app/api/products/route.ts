import {NextRequest,NextResponse} from 'next/server';import {getProducts} from '@/lib/products';
export async function GET(request:NextRequest){const params=Object.fromEntries(request.nextUrl.searchParams.entries());return NextResponse.json({data:getProducts(params),meta:{count:getProducts(params).length}})}
