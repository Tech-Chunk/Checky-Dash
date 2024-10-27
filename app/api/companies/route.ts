import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
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

const db = getFirestore();

export async function GET(request: Request) {
    const auth = getAuth();
    
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1]; // Expecting 'Bearer <token>'
        const decodedToken = await auth.verifyIdToken(token!);
        const uid = decodedToken.uid;

        const companiesSnapshot = await db.collection('companies').where('OWNER_ID', '==', uid).get();

        const companies = companiesSnapshot.docs.map(doc => ({
            companyID: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.error();
    }
}
