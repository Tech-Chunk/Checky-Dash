// route.ts
import { NextResponse } from 'next/server';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

export async function POST(request: Request) {
    const auth = getAuth();
    const db = getFirestore();

    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        console.log('Received request with token:', token ? 'yes' : 'no');

        if (!token) {
            return NextResponse.json({ error: 'No authorization token provided' }, { status: 401 });
        }

        // Verify token and get user ID
        const decodedToken = await auth.verifyIdToken(token);
        const userId = decodedToken.uid;
        console.log('Token verified for user:', userId);

        const body = await request.json();
        console.log('Received body:', body);

        const { companyName, region, plan } = body;

        if (!companyName || !region || !plan) {
            console.log('Missing fields:', { companyName, region, plan });
            return NextResponse.json({ 
                error: 'Missing required fields',
                received: { companyName, region, plan } 
            }, { status: 400 });
        }

        // Create new company document with verified userId
        const companyRef = await db.collection('companies').add({
            OWNER_ID: userId,  // Using the verified userId from token
            name: companyName,
            region: region,
            plan: plan,
            createdAt: new Date()
        });

        return NextResponse.json({ 
            success: true, 
            companyId: companyRef.id 
        }, { status: 201 });

    } catch (error) {
        console.error('Detailed error:', error);
        return NextResponse.json({ 
            error: 'Failed to create company',
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}