// route.ts
import { NextResponse } from 'next/server';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
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


export async function POST(request: Request) {
    const auth = getAuth();
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const decodedToken = await auth.verifyIdToken(token!);
        const uid = decodedToken.uid;

        const { email, name } = await request.json();

        const companiesSnapshot = await db.collection('companies').where('OWNER_ID', '==', uid).get();
        if (companiesSnapshot.empty) {
            return NextResponse.json({ error: 'No companies found for this user' }, { status: 404 });
        }
        
        const companyId = companiesSnapshot.docs[0].id;

        const userRef = await db.collection('companies').doc(companyId).collection('users').add({
            email,
            name,
            checked_in: false,
            created_on: Timestamp.now()
        });

        return NextResponse.json({ 
            success: true, 
            userId: userRef.id 
        }, { status: 201 });

    } catch (error) {
        console.error('Error adding user:', error);
        return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
    }
}