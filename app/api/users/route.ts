// pages/api/usersInCompany.ts
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

        // First, retrieve all companies owned by the user
        const companiesSnapshot = await db.collection('companies').where('OWNER_ID', '==', uid).get();

        // Ensure there is at least one company owned by the user
        if (companiesSnapshot.empty) {
            return NextResponse.json({ error: 'No companies found for this user' }, { status: 404 });
        }

        // If there are multiple companies, pick the first one (or handle multiple if needed)
        const companyDoc = companiesSnapshot.docs[0];
        const companyId = companyDoc.id;

        // Fetch users inside this specific company
        const usersSnapshot = await db.collection(`companies/${companyId}/users`).get();
        const users = usersSnapshot.docs.map(doc => ({
            userID: doc.id,
            ...doc.data(),
        }));

        // Fetch the company name
        const companyName = companyDoc.data().name; // Adjust this field name if needed

        return NextResponse.json({ companyId, companyName, users });
    } catch (error) {
        console.error('Error fetching users in company:', error);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}
